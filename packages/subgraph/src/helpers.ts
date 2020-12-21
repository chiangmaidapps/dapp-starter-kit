import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { SimpleToken } from '../generated/SimpleToken/SimpleToken'
import { User, Token } from '../generated/schema'

/************************************
 ********** Helpers ***********
 ************************************/

export function ZERO_BD(): BigDecimal {
  return BigDecimal.fromString('0')
}

export function ZERO_BI(): BigInt {
  return BigInt.fromI32(0)
}

export function ONE_BI(): BigInt {
  return BigInt.fromI32(1)
}

export function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function wei(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}

export function convertToWei(amount: BigInt): BigDecimal {
  return amount.toBigDecimal().div(exponentToBigDecimal(18))
}

export function convertTokenToDecimal(tokenAmount: BigInt, tokenDecimals: i32): BigDecimal {
  if (tokenDecimals == 0) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(tokenDecimals))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(ZERO_BD().toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  // bind to the token address
  const contract = SimpleToken.bind(tokenAddress)

  let symbolValue = 'unknown'
  const symbolResult = contract.try_symbol()
  if (!symbolResult.reverted) {
    symbolValue = symbolResult.value
  }

  return symbolValue
}

export function fetchTokenName(tokenAddress: Address): string {
  // bind to the token address
  const contract = SimpleToken.bind(tokenAddress)

  let nameValue = 'unknown'
  const nameResult = contract.try_name()
  if (!nameResult.reverted) {
    nameValue = nameResult.value
  }

  return nameValue
}

export function fetchTokenDecimals(tokenAddress: Address): i32 {
  const contract = SimpleToken.bind(tokenAddress)

  let decimalValue = null
  const decimalResult = contract.try_decimals()
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value
  }
  return decimalValue
}

export function createOrFetchUser(address: Address): User {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    user.tokenBalance = ZERO_BI()
    user.numTransfers = ZERO_BI()
    user.save()
  }
  return user as User
}

export function createOrFetchToken(address: Address): Token {
  let token = Token.load(address.toHexString())
  if (token === null) {
    token = new Token(address.toHexString())
    token.save()
  }
  return token as Token
}