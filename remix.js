const Web3 = require('web3');
const fs = require('fs');

const provider = 'HTTP://127.0.0.1:8545'; // Ganache
const web3 = new Web3(provider);

// Пути к ABI и байткоду
const abiPath = './SimpleWalletABI.json';
const bytecodePath = './SimpleWalletBytecode.txt';

// Проверяем, существуют ли файлы ABI и Bytecode
if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
    console.error('Ошибка: Не найдены файлы ABI или Bytecode.');
    process.exit(1);
}

const abi = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));
const bytecode = fs.readFileSync(bytecodePath, 'utf-8');

const deployContract = async () => {
    try {
        // Получаем список аккаунтов
        const accounts = await web3.eth.getAccounts();
        console.log('Доступные аккаунты:', accounts);

        // Создаём контракт
        const contract = new web3.eth.Contract(abi);

        // Деплоим контракт
        const deployedContract = await contract.deploy({
            data: bytecode,
        }).send({
            from: accounts[0], // Аккаунт для деплоя
            gas: 300000,// Лимит газа
            gasPrice: '30000000000', // Цена газа
        });

        console.log('Контракт развернут по адресу:', deployedContract.options.address);
    } catch (error) {
        console.error('Ошибка при деплое контракта:', error);
    }
};

deployContract();
