import { Transfer } from '../generated/SimpleToken/SimpleToken'
import { User } from '../generated/schema'

// Handle token transfers
export function handleTransfer(event: Transfer): void {
  let amount = event.params.value

  // Don't create User entity if `from` address is token
  if(event.params.from != event.address) {
    // Load `from` user and create if doesn't exist already 
    let fromAddress = event.params.from.toHex()
    let fromUser = User.load(fromAddress)
    if (fromUser == null) {
      fromUser = new User(fromAddress)
    }

    // Update `from` user balance
    fromUser.tokenBalance = fromUser.tokenBalance.minus(amount)
    // Save changes to `from` user
    fromUser.save()
  }

  // Don't create User entity if `to` address is token
  if(event.params.to != event.address) {
    // Load `to` user and create if doesn't exist already
    let toAddress = event.params.to.toHex()
    let toUser = User.load(toAddress)
    if (toUser == null) {
      toUser = new User(toAddress)
    }

    // Update `to` user balance
    toUser.tokenBalance = toUser.tokenBalance.plus(amount)
    // Save changes to `to` user
    toUser.save()
  }
}