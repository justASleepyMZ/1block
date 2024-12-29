const Web3 = require('web3');
const fs = require('fs');

// Настройка соединения
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // Ganache
const web3 = new Web3(provider);

// ABI и адрес контракта
const abi = JSON.parse(fs.readFileSync('./SimpleWalletABI.json', 'utf-8'));
const contractAddress = '0x1EB22f309f11A43aB974984bb5573d02FDA48419';

// Подключение к контракту
const contract = new web3.eth.Contract(abi, contractAddress);

const main = async () => {
    const accounts = await web3.eth.getAccounts();

    // Получение баланса контракта
    const balance = await contract.methods.getBalance().call();
    console.log('Contract balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

    // Отправка средств в контракт
    await web3.eth.sendTransaction({
        from: accounts[1],
        to: contractAddress,
        value: web3.utils.toWei('1', 'ether'),
    });
    console.log('1 ETH sent to contract');

    // Получение обновленного баланса
    const newBalance = await contract.methods.getBalance().call();
    console.log('Updated balance:', web3.utils.fromWei(newBalance, 'ether'), 'ETH');

    // Вывод средств владельцем
    await contract.methods.withdraw().send({ from: accounts[0] });
    console.log('All funds withdrawn by owner');
};

main().catch(console.error);
