# Introduction 

---



La création d\'un smart contract pour l\'énergie solaire via la
blockchain peut être réalisée en suivant les étapes suivantes :
```
1.  Choisissez la plateforme de blockchain pour votre smart contract :
    Ethereum est la plateforme la plus populaire pour les smart
    contracts, mais il existe également d\'autres options telles que
    Tron, EOS, etc.

2.  Créez un nouveau contrat intelligent dans votre IDE. Pour cela, vous
    pouvez utiliser Solidity, un langage de programmation de contrat
    intelligent populaire pour Ethereum. Vous pouvez également utiliser
    Vyper, un autre langage de programmation de contrat intelligent.

3.  Définissez les variables pour stocker les informations nécessaires,
    telles que l'adresse du producteur d'énergie, la quantité
    d'énergie produite et le prix de l'énergie.

4.  Utilisez les fonctions pour écrire la logique de votre smart
    contract. Par exemple, vous pouvez utiliser une fonction pour
    permettre aux producteurs d'énergie solaire de stocker leurs
    informations sur la blockchain, une autre pour permettre aux
    consommateurs d'acheter de l'énergie, etc.

5.  Utilisez des contrats intelligents existants ou créez-en de nouveaux
    pour gérer les transactions financières. Par exemple, vous pouvez
    utiliser des contrats intelligents pour gérer les paiements en
    cryptomonnaies, les remboursements, les remises, etc.

6.  Testez votre contrat intelligent en utilisant un environnement de
    test. Vous pouvez utiliser des outils tels que Ganache pour créer un
    environnement de test local ou utiliser des environnements de test
    en ligne tels que Rinkeby ou Kovan.

7.  Déployez votre smart contract sur la blockchain. Pour cela, vous
    pouvez utiliser un service tel que Remix ou Truffle pour déployer
    votre contrat intelligent sur la blockchain.

8.  Mettez en place une interface utilisateur pour permettre aux
    utilisateurs d\'interagir avec votre contrat intelligent. Vous
    pouvez créer une application web ou mobile qui interagit avec votre
    contrat intelligent pour permettre aux producteurs de publier leur
    production d\'énergie, et aux consommateurs d\'acheter de l\'énergie
    solaire.
```
---
En suivant ces étapes, vous pouvez créer un smart contract pour
l'énergie solaire via la blockchain. Cela peut aider à faciliter les
transactions entre les producteurs d'énergie solaire et les
consommateurs, ainsi qu'à promouvoir l'utilisation de l'énergie
renouvelable.

Effectivement, pour un smart contract qui concerne l'énergie solaire,
il est important de spécifier les caractéristiques des panneaux solaires
utilisés pour la production d'énergie. Cela permet de garantir la
qualité et la fiabilité de l'énergie produite.

Pour inclure ces caractéristiques dans le smart contract, vous pouvez
ajouter des variables pour stocker les informations sur les panneaux
solaires utilisés pour la production d\'énergie, telles que :
```
-   La puissance nominale du panneau solaire en watts crête (Wc)
-   L'efficacité du panneau solaire en pourcentage (%)
-   Le nombre de panneaux solaires utilisés pour la production
    d'énergie
-   La surface totale des panneaux solaires en mètres carrés (m²)
-   Le fabricant et le modèle des panneaux solaires
```
Vous pouvez également utiliser des fonctions pour valider les
informations sur les panneaux solaires, telles que vérifier si la
puissance nominale des panneaux solaires correspond à la surface totale
des panneaux solaires et à leur efficacité.

En incluant ces informations dans le smart contract, vous pouvez
garantir que l'énergie produite est de haute qualité et que les
consommateurs savent exactement ce qu'ils achètent.

Le smart contract pour l'énergie solaire via la blockchain peut inclure
les fonctionnalités suivantes :
```
1.  Variables pour stocker les informations nécessaires, telles que
    l'adresse du producteur d'énergie, la quantité d'énergie produite
    et le prix de l'énergie, ainsi que des informations sur les
    panneaux solaires utilisés pour la production d'énergie, telles que
    la puissance nominale, l'efficacité, le nombre de panneaux solaires
    et la surface totale des panneaux solaires.

2.  Fonctions pour écrire la logique du smart contract, telles que des
    fonctions pour permettre aux producteurs d'énergie solaire de
    stocker leurs informations sur la blockchain, une fonction pour
    permettre aux consommateurs d'acheter de l'énergie, ainsi que des
    fonctions pour valider les informations sur les panneaux solaires.

3.  Contrats intelligents existants ou nouveaux pour gérer les
    transactions financières, telles que des contrats intelligents pour
    gérer les paiements en cryptomonnaies, les remboursements et les
    remises.

4.  Test de la fonctionnalité du smart contract en utilisant un
    environnement de test, tel que Ganache ou Rinkeby.

5.  Déploiement du smart contract sur la blockchain en utilisant un
    service tel que Remix ou Truffle.

6.  Mise en place d'une interface utilisateur pour permettre aux
    utilisateurs d'interagir avec le smart contract et d'acheter de
    l'énergie solaire.
```
En incluant ces fonctionnalités dans le smart contract, les producteurs
et les consommateurs peuvent faciliter les transactions liées à
l'énergie solaire via la blockchain, garantir la qualité et la
fiabilité de l'énergie produite, ainsi que promouvoir l'utilisation de
l'énergie renouvelable.


# ERC20 project Blockchain
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
