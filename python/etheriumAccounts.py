import subprocess

from web3 import Web3
from web3.middleware import geth_poa_middleware

# Démarrer le nœud Ethereum avec Docker
command = ["docker", "run", "-d", "--name", "ethereum-node", "-p", "8545:8545", "ethereum/client-go"]
subprocess.run(command, stdout=subprocess.PIPE)

# Attendre que le nœud soit démarré
print("Attente du démarrage du nœud Ethereum...")
subprocess.run(["sleep", "10"])

# Connexion au nœud Ethereum
print("Connexion au nœud Ethereum...")
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Ajout du middleware POA
print("Ajout du middleware POA...")
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

# Affichage de l'adresse du compte par défaut
print("Affichage de l'adresse du compte par défaut...")
print(w3.eth.coinbase)

# Affichage de tous les comptes disponibles
print("Affichage de tous les comptes disponibles...")
print(w3.eth.accounts)

# Arrêter le nœud Ethereum
print("Arrêt du nœud Ethereum...")
subprocess.run(["docker", "stop", "ethereum-node"], stdout=subprocess.PIPE)
subprocess.run(["docker", "rm", "ethereum-node"], stdout=subprocess.PIPE)
