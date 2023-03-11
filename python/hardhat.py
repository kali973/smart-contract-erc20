import os

# Obtenir le chemin du répertoire parent
parent_dir = os.path.dirname(os.getcwd())
for root, dirs, files in os.walk(parent_dir):
    if "hardhat.config.js" in files:
        found_readme = True
        os.chdir(root)
        os.system('npx hardhat accounts')
        os.system('npx hardhat compile')
        os.system('npx hardhat clean')
        os.system('npx hardhat test')
        os.system('npx hardhat node')
        os.system('npx hardhat help')
        os.system('set REPORT_GAS=true')
        os.system('npx hardhat test')
        os.system('npx hardhat coverage')
        os.system('npx hardhat run scripts/deploy.js')
        os.system('node scripts/deploy.js')
        os.system('npx eslint "**/*.js"')
        os.system('npx eslint "**/*.js" --fix')
        os.system('npx prettier "**/*.{json,sol,md}" --check')
        os.system('npx prettier "**/*.{json,sol,md}" --write')
        os.system('npx solhint "contracts/**/*.sol"')
        os.system('npx solhint "contracts/**/*.sol" --fix')
        break

if not found_readme:
    print("Le fichier README.md n'a pas été trouvé dans le répertoire.")
