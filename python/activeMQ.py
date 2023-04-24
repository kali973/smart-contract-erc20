import os
import requests
import subprocess
import sys
import time
from tqdm import tqdm

url = "https://nodejs.org/dist/v18.14.2/node-v18.14.2-x64.msi"
filename = "nodejs_installer.msi"

# Demander à l'utilisateur s'il souhaite installer Node.js
answer = input("Voulez-vous installer Node.js (o/n) ? => ")

if answer.lower() == "o":
    # Exécute la commande npm install --save-dev ts-node dans un terminal
    os.system('npm install --save-dev ts-node')

    # Télécharger le fichier d'installation de Node.js
    response = requests.get(url)
    with open(filename, "wb") as f:
        f.write(response.content)

    print("Téléchargement terminé.")

    # Ouvrir le fichier d'installation de Node.js
    os.startfile(filename)
    # Exécuter le fichier d'installation de Node.js en mode silencieux
    # subprocess.run(["msiexec", "/i", filename, "/quiet"])
else:
    print("Installation annulée.")

# Demander à l'utilisateur s'il souhaite installer hardhat
response = input('Voulez-vous installer Hardhat ? (o/n) ')

if response.lower() == 'o':
    # Définir la commande npm
    command = 'npm install -g hardhat'

    # Définir le nombre total d'itérations
    total_iterations = 100

    # Exécuter la commande avec tqdm pour afficher la barre de progression
    with tqdm(total=total_iterations, desc='Installation de Hardhat', unit='iteration') as pbar:
        os.system(command)
        pbar.update(total_iterations)

    # Afficher un message de confirmation
    print('L\'installation de Hardhat est terminée.')
else:
    print('Installation de Hardhat annulée.')

# Demander à l'utilisateur s'il souhaite installer hardhat
response = input('Voulez-vous installer typescript ? (o/n) ')

if response.lower() == 'o':
    # Définir la commande npm
    command = 'npm install typescript'

    # Définir le nombre total d'itérations
    total_iterations = 100

    # Exécuter la commande avec tqdm pour afficher la barre de progression
    with tqdm(total=total_iterations, desc='Installation de typescript', unit='iteration') as pbar:
        os.system(command)
        pbar.update(total_iterations)

    # Afficher un message de confirmation
    print('L\'installation de typescript est terminée.')
else:
    print('Installation de typescript annulée.')

subprocess.run(['pip', 'install', '--upgrade', 'pip'])
subprocess.run(["pip", "install", "docker-compose"])

try:
    subprocess.run(["docker-compose", "up"], check=True)
except subprocess.CalledProcessError as e:
    print()
    print(
        "Erreur : Échec de l'exécution de la commande docker-compose. Veuillez lancer Docker ou installer Docker : https://docs.docker.com/desktop/install/windows-install/.")
    print()

    url = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
    answer = input("Voulez-vous effectuer le téléchargement de Docker Desktop Installer (o/n) ? => ")

    if answer == "o":
        print("Téléchargement en cours", end="")
        for i in range(5):
            print(".", end="", flush=True)
            time.sleep(1)
            response = requests.get(url)
            with open("Docker Desktop Installer.exe", "wb") as f:
                f.write(response.content)
        print("\nFin du téléchargement")
        file_path = "Docker Desktop Installer.exe"
        with open(file_path, "wb") as f:
            f.write(response.content)

        if os.path.exists(file_path):
            user_input = input(
                "Le fichier a été téléchargé avec succès. Voulez-vous l'installer maintenant ? (o/n) => ")
            if user_input.lower() == "o":
                subprocess.run([file_path], check=True)
                print("Installation terminée.")
                os.remove("Docker Desktop Installer.exe")
            else:
                print("Installation annulée.")
        else:
            print("Le téléchargement du fichier a échoué.")
    else:
        print("")
        print("Lancement de docker")

        os.startfile(r"C:\Program Files\Docker\Docker\Docker Desktop.exe")

        # Attendre que l'application Docker Desktop soit lancée
        for i in range(80, 0, -1):
            if i == 10:
                sys.stdout.write("\033c")
                sys.stdout.flush()
            sys.stdout.write("\r" + str(i))
            sys.stdout.flush()
            time.sleep(1)

        # Installer docker-compose
        subprocess.call(["pip", "install", "docker-compose"], start_new_session=True)

        # Lancer docker-compose
        subprocess.call(["docker-compose", "up"], start_new_session=True)

        # # exécute la commande docker pull rmohr/activemq
        # subprocess.run(['docker', 'pull', 'rmohr/activemq'])
        #
        # subprocess.run(["docker", "run", "-d", "-p", "80:80", "docker/getting-started"])
        #
        # # Exécution de la commande Docker
        # subprocess.call(
        #     ['docker', 'run', '--name', 'postgresql-container', '-p', '5432:5432', '-e', 'POSTGRES_PASSWORD=solarix',
        #      '-d', 'postgres'])
        #
        # # Define the Docker command
        # docker_cmd = ["docker", "run", "-d", "--rm", "--name", "ethereum", "-p", "8545:8545", "-p", "30303:30303",
        #               "ethereum/client-go:v1.9.25", "--rpc", "--rpcaddr", "0.0.0.0",
        #               "--rpcapi=db,eth,net,web3,personal", "--rpccorsdomain", "*", "--dev"]
        #
        # # Execute the Docker command
        # result = subprocess.run(docker_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        #
        # # Check if the command was successful
        # if result.returncode == 0:
        #     print('Docker container started successfully')
        # else:
        #     print(f'Error: {result.stderr.decode()}')
        #
        # # exécute la commande docker run -p 61616:61616 -p 8161:8161 rmohr/activemq
        # command = 'docker run -p 61616:61616 -p 8161:8161 rmohr/activemq'
        # subprocess.call(command, shell=True)
