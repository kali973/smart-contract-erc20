import os

# Demander à l'utilisateur s'il souhaite exécuter le script
response = input("Voulez-vous exécuter le script de compilation ? (o/n) ")

if response.lower() != "o":
    print("Le script n'a pas été exécuté.")
else:
    # Obtenir le chemin du répertoire parent
    parent_dir = os.path.dirname(os.getcwd())
    for root, dirs, files in os.walk(parent_dir):
        if "gradlew.bat" in files:
            gradlew = True
            os.chdir(root)
            os.system('gradlew.bat bootJar')
            break

    if not gradlew:
        print("Le fichier gradlew.bat n'a pas été trouvé dans le répertoire.")

parent_dir = os.path.dirname(os.getcwd())

compile_smart_contracts = input("Voulez-vous compiler les smart contracts ? (o/n) ").lower() == "o"

if compile_smart_contracts:
    for root, dirs, files in os.walk(parent_dir):
        if "hardhat.config.js" in files:
            found_readme = True
            os.chdir(root)
            os.system('npm install --save-dev hardhat')
            os.system('npm install --save-dev @nomiclabs/hardhat-waffle')
            os.system('npx hardhat accounts')
            os.system('npx hardhat compile')
            os.system('npx hardhat clean')
            os.system('npx hardhat test')
            os.system('npx hardhat node')
            os.system('npm audit fix --force')
            os.system('npx hardhat help')
            os.system('set REPORT_GAS=true')
            os.system('npx hardhat test')
            os.system('npx hardhat coverage')
            os.system('npx hardhat run scripts/deploy.js')
            os.system('node scripts/deploy.js')
            os.system('npx eslint "**/*.js"')
            os.system('npx eslint "**/*.js" --fix')
            os.system('npx prettier "**/*.json" --write')
            os.system('npx solhint "contracts/**/*.sol"')
            os.system('npx solhint "contracts/**/*.sol" --fix')

            break

    if not found_readme:
        print("Le fichier README.md n'a pas été trouvé dans le répertoire.")
else:
    print("Les smart contracts ne seront pas compilés.")
