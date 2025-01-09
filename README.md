# 1Block

**1Block** is a blockchain-based project designed to demonstrate simple wallet functionality using an Ethereum smart contract. It allows users to deposit Ether, check the balance, and withdraw funds securely.

## Introduction

This project is built with Solidity for the smart contract and JavaScript (using Web3.js) for interacting with the blockchain. The goal is to provide a basic understanding of blockchain interaction and smart contract operations.

## Code Explanation

### Smart Contract (`main.sol`)

The smart contract implements a basic wallet with the following functionalities:
- **Deposit Funds**: Users can send Ether to the contract.
- **Get Balance**: A function to retrieve the contract's current Ether balance.
- **Withdraw Funds**: A function allowing only the owner to withdraw all the funds.

Key Solidity Features:
- **`msg.sender` and `msg.value`**: Used for identifying the sender and the amount of Ether sent.
- **Access Control**: Ensures only the owner can withdraw funds.

### Interaction Script (`interact.js`)

The script uses Web3.js to connect to the deployed smart contract and perform the following actions:
1. **Retrieve Accounts**: Fetches the accounts available on the Ethereum node.
2. **Check Balance**: Calls the smart contract's balance function to display the Ether balance.
3. **Send Ether**: Sends 1 ETH from one account to the smart contract.
4. **Withdraw Funds**: Executes the contract's withdrawal function, allowing the owner to withdraw all funds.

Sample Workflow in the Script:
```javascript
const accounts = await web3.eth.getAccounts();

// Get current balance of the contract
const balance = await contract.methods.getBalance().call();
console.log('Contract balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

// Send 1 ETH to the contract
await web3.eth.sendTransaction({
    from: accounts[1],
    to: contractAddress,
    value: web3.utils.toWei('1', 'ether'),
});
console.log('1 ETH sent to contract');

// Get the updated balance
const newBalance = await contract.methods.getBalance().call();
console.log('Updated balance:', web3.utils.fromWei(newBalance, 'ether'), 'ETH');

// Withdraw funds (only owner can perform this action)
await contract.methods.withdraw().send({ from: accounts[0] });
console.log('All funds withdrawn by owner');
