import { Transfer } from '../../generated/SimpleToken/SimpleToken'
import { 
  ONE_BI,
  createOrFetchUser,
  createOrFetchToken
} from '../helpers'

// Handle token transfers
export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address
  let fromAddress = event.params.from
  let toAddress = event.params.to
  let amount = event.params.value

  // Don't create User entity if `from` address is token
  if(fromAddress != tokenAddress) {
    // Load `from` user and create if doesn't exist already 
    let fromUser = createOrFetchUser(fromAddress)
    // Update `from` user balance
    fromUser.tokenBalance = fromUser.tokenBalance.minus(amount)
    fromUser.numTransfers = fromUser.numTransfers.plus(ONE_BI())
    // Save changes to `from` user
    fromUser.save()
  }

  // Don't create User entity if `to` address is token
  if(toAddress != tokenAddress) {
    // Load `to` user and create if doesn't exist already
    let toUser = createOrFetchUser(toAddress)
    // Update `to` user balance
    toUser.tokenBalance = toUser.tokenBalance.plus(amount)
    // Save changes to `to` user
    toUser.save()
  }

  let token = createOrFetchToken(tokenAddress)
  token.numTransfers = token.numTransfers.plus(ONE_BI())
  token.save()
}