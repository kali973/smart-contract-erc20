import os
import subprocess
import sys
import time

import requests

# exécute la commande pip install --upgrade pip et install yarn et npn
# subprocess.call(['npm', 'install', '--global', 'yarn'])
# subprocess.call(['yarn', 'install'])
# subprocess.call(['yarn', 'compile'])
# subprocess.call(['yarn', 'test'])

url = "https://nodejs.org/dist/v18.14.2/node-v18.14.2-x64.msi"
filename = "nodejs_installer.msi"

# Demander à l'utilisateur s'il souhaite installer Node.js
answer = input("Voulez-vous installer Node.js (o/n) ? => ")

if answer == "o":
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
        for i in range(50, 0, -1):
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

        # exécute la commande docker pull rmohr/activemq
        subprocess.run(['docker', 'pull', 'rmohr/activemq'])

        subprocess.run(["docker", "run", "-d", "-p", "80:80", "docker/getting-started"])

        # Define the Docker command
        docker_cmd = ["docker", "run", "-d", "--rm", "--name", "ethereum", "-p", "8545:8545", "-p", "30303:30303",
                      "ethereum/client-go:v1.9.25", "--rpc", "--rpcaddr", "0.0.0.0",
                      "--rpcapi=db,eth,net,web3,personal", "--rpccorsdomain", "*", "--dev"]

        # Execute the Docker command
        result = subprocess.run(docker_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Check if the command was successful
        if result.returncode == 0:
            print('Docker container started successfully')
        else:
            print(f'Error: {result.stderr.decode()}')

        # exécute la commande docker run -p 61616:61616 -p 8161:8161 rmohr/activemq
        command = 'docker run -p 61616:61616 -p 8161:8161 rmohr/activemq'
        subprocess.call(command, shell=True)
