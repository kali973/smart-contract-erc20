import logging
import platform
import subprocess
import sys
import time
import webbrowser


def a():
    # Exécution du script Python avec des privilèges d'administrateur
    os.system('start cmd /k "python smartContractDeploymentApplication.py"')


import os


def execute_commands_in_directory(parent_dir):
    for root, dirs, files in os.walk(parent_dir):
        if "README.md" in files:
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


def clear():
    linux = 'clear'
    windows = 'cls'
    os.system([linux, windows][os.name == 'nt'])


logging.disable(sys.maxsize)
number = 1
data = ""

while number != '0':
    print()
    data += ' ----------------------------\n'
    if os.name == "nt":
        data = (' ----------------------------\n')
        data += ' Hi ' + platform.uname()[1] + '\n'
    data += ' ----------------------------\n'
    data += ' Select option:\n'
    data += ' [1] Install and Activate Package\n'
    data += ' [2] Create Database Blockchain\n'
    data += ' [3] Generate formulaire IHM\n'
    data += ' [4] Show ActiveMQ\n'
    data += ' [5] Compilation des smart contrats & Micro service spring Boot\n'
    data += ' [6] Smart Contract Build\n'
    data += ' [0] Exit\n'
    print(data)
    number = input(" Number~# ")
    if number == '1':
        print("\n [***] Install ActiveMQ ...")
        # Appel de la fonction pour définir la variable globale
        subprocess.run(["start", "cmd", "/c", "python", "activeMQ.py"], shell=True)
        clear()
        data = ""
    elif number == '2':
        print("\n [***] Create Database Blockchain...\n")
        subprocess.run(["start", "cmd", "/c", "python", "database.py"], shell=True)
        clear()
        data = ""
    elif number == '3':
        print("\n [***] Generate formulaire IHM\n")
        subprocess.run(["start", "cmd", "/c", "python", "postgREST.py"], shell=True)
        clear()
        data = ""
    elif number == '4':
        print("\n [***] Show ActiveMQ...\n")
        webbrowser.open('http://127.0.0.1:8161')
        clear()
        data = ""
    elif number == '5':
        print("\n [***] Compilation des smart contrats & Micro service spring Boot ...\n")
        subprocess.Popen(['python', 'hardhat.py'], creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '6':
        print("\n [***] Smart Contract Build ...\n")
        subprocess.Popen(['python', 'smartContractDeploymentApplication.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '0':
        print('\n [+] Good Bye ' + platform.uname()[1] + ' !\n')
        quit()
    else:
        print("\n [X] Error !\n [!] Select this number: 1, 2, 3, 4, 5, 6 or 0\n")
