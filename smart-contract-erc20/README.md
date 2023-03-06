# ERC20 project

Ce projet illustre un cas d'utilisation de base du jeton ERC-20, intégrant d'autres outils couramment utilisés aux côtés de Hardhat dans le
écosystème.

Le projet est fourni avec un contrat, un test pour ce contrat, un exemple de script qui déploie ce contrat et un exemple
d'une implémentation de tâche, qui liste simplement les comptes disponibles. Il est également livré avec une variété d'autres outils,
préconfiguré pour fonctionner avec le code du projet.

Le code a été sourcé
from [UNDERSTAND THE ERC-20 TOKEN SMART CONTRACT](https://ethereum.org/en/developers/tutorials/understand-the-erc-20-token-smart-contract/)
tutorial.

Les tâches suivantes sont préconfigurées

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Smart Contract Build & Test

yarn doit être installé pour utiliser les commandes yarn afin de créer le contrat intelligent. Cependant, les tâches de casque ci-dessus peuvent
également être utilisé pour compiler et tester le Smart Contract.

Vous trouverez ci-dessous des commandes de fil à exécuter séquentiellement pour créer le contrat intelligent
```shell
yarn install
yarn compile
yarn test
```

# Etherscan verification

Pour la vérification Etherscan, vous devez d'abord déployer un contrat sur un réseau Ethereum pris en charge par Etherscan, tel que Ropsten.

Dans ce projet, copiez le fichier .env.example dans un fichier nommé .env, puis modifiez-le pour remplir les détails. 
Entrez votre clé API Etherscan, l'URL de votre nœud Ropsten (par exemple d'Alchemy) et la clé privée du compte qui enverra la transaction de déploiement. Avec un fichier .env valide en place, déployez d'abord votre contrat :

```shell
yarn deploy:ropsten
```

Ensuite, copiez l'adresse de déploiement et collez-la pour remplacer `DEPLOYED_CONTRACT_ADDRESS` dans cette commande :

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS 10000
```
