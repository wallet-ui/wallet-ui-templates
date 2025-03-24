import { lamports } from 'gill'

export function solStringToLamports(solQuantityString: string) {
  if (Number.isNaN(parseFloat(solQuantityString))) {
    throw new Error('Could not parse token quantity: ' + String(solQuantityString))
  }
  const numDecimals = BigInt(solQuantityString.split('.')[1]?.length ?? 0)
  const bigIntLamports = BigInt(solQuantityString.replace('.', '')) * BigInt('10') ** (BigInt('9') - numDecimals)

  return lamports(bigIntLamports)
}
