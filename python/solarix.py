import logging
import platform
import subprocess
import sys
import time
import webbrowser


def a():
    # Exécution du script Python avec des privilèges d'administrateur
    os.system('start cmd /k "python smartContractDeploymentApplicationFrontBack.py"')


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
    data += ' [3] Launch formulaire IHM\n'
    data += ' [4] Show ActiveMQ\n'
    data += ' [5] SonarQube Analyse\n'
    data += ' [6] Compilation des smart contrats & Micro service spring Boot\n'
    data += ' [7] FrontBack - Micro-service\n'
    data += ' [8] FrontBack - Write message ActiveMQ\n'
    data += ' [9] Deploiement network aurora\n'
    data += ' [A] FrontEnd Micro-service\n'
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
        print("\n [***] Launch formulaire IHM\n")
        subprocess.Popen(['python', 'reactJS.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        clear()
        data = ""
    elif number == '4':
        print("\n [***] Show ActiveMQ...\n")
        webbrowser.open('http://127.0.0.1:8161')
        clear()
        data = ""
    elif number == '5':
        print("\n [***] SonarQube Analyse...\n")
        subprocess.run(["start", "cmd", "/c", "python", "sonarqube.py"], shell=True)
        clear()
        data = ""
    elif number == '6':
        print("\n [***] Compilation des smart contrats & Micro service spring Boot ...\n")
        subprocess.Popen(['python', 'hardhat.py'], creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '7':
        print("\n [***] Smart Contract Build ...\n")
        subprocess.Popen(['python', 'smartContractDeploymentApplicationFrontBack.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '8':
        print("\n [***] Write message ActiveMQ ...\n")
        subprocess.Popen(['python', 'writeActiveMQ.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '9':
        print("\n [***] Deploy.js --network aurora ...\n")
        subprocess.Popen(['python', 'deploySmartContrat.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == 'A':
        print("\n [***] Front End ...\n")
        subprocess.Popen(['python', 'smartContractDeploymentApplicationFrontEnd.py'],
                         creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '0':
        print('\n [+] Good Bye ' + platform.uname()[1] + ' !\n')
        quit()
    else:
        print("\n [X] Error !\n [!] Select this number: 1, 2, 3, 4, 5, 6, 7, 8, 9, A or 0\n")
