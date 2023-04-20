# Recherche du fichier JAR à partir du répertoire parent courant
import os

for root, dirs, files in os.walk('..'):
    for file in files:
        if file.endswith('smart-contract-deployment-0.0.1-SNAPSHOT.jar'):
            jar_file = os.path.join(root, file)
            break
    else:
        continue
    break
else:
    print("Le fichier JAR n'a pas été trouvé dans les sous-répertoires du répertoire parent courant.")
    exit()

# Exécution du fichier JAR
os.system(f'java -jar {jar_file}')
