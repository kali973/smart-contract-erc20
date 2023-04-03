import os
import subprocess

import requests

current_dir = os.getcwd()
activeMQ_url = "http://localhost:8161"
try:
    response = requests.get(activeMQ_url)
    response.raise_for_status()
    # Calcul du bloc dans la blockchain
    three_dirs_up = os.path.abspath(os.path.join(current_dir, "../../../"))
    subprocess.call(['java', '-jar', three_dirs_up + '/target/camel-sprint-boot-service-a-0.0.1-SNAPSHOT.jar'])
except (requests.exceptions.ConnectionError, requests.exceptions.HTTPError) as e:
    print("\n Erreur de connexion à ActiveMQ. Veuillez lancer ou installer ActiveMQ.\n")
