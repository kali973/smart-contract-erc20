import logging
import os
import platform
import subprocess
import sys
import time
import webbrowser


def a():
    # Exécution du script Python avec des privilèges d'administrateur
    os.system('start cmd /k "python etheriumAccounts.py"')


def clear():
    linux = 'clear'
    windows = 'cls'
    os.system([linux, windows][os.name == 'nt'])


logging.disable(sys.maxsize)
number = 1
data = ""
current_dir = os.getcwd()

three_dirs_up = os.path.abspath(os.path.join(os.getcwd(), "../../../"))

while number != '0':
    print()
    data += ' ----------------------------\n'
    if os.name == "nt":
        data = (' ----------------------------\n')
        data += ' Hi ' + platform.uname()[1] + '\n'
    data += ' ----------------------------\n'
    data += ' Select option:\n'
    data += ' [1] Install & Activate ActiveMQ\n'
    data += ' [2] Launch ActiveMQ\n'
    data += ' [3] Under Construction\n'
    data += ' [4] Under Construction\n'
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
        print("\n [***] Launch ActiveMQ...\n")
        webbrowser.open('http://127.0.0.1:8161')
        clear()
        data = ""
    elif number == '3':
        print("\n [***] Voltaic data entry ...\n")
        time.sleep(5)
        clear()
        data = ""
    elif number == '4':
        print("\n [***] Calculate Blockchain ...\n")
        subprocess.Popen(['python', 'blockchain.py'], creationflags=subprocess.CREATE_NEW_CONSOLE)
        time.sleep(5)
        clear()
        data = ""
    elif number == '0':
        print('\n [+] Good Bye ' + platform.uname()[1] + ' !\n')
        quit()
    else:
        print("\n [X] Error !\n [!] Select this number: 1, 2, 3, 4, or 0\n")
