# Recherche du fichier JAR à partir du répertoire parent courant
import os

for root, dirs, files in os.walk('..'):
    for file in files:
        if file.endswith('logo.svg'):
            jar_file = os.path.join(root, file)
            break
    else:
        continue
    break
else:
    print("Le fichier JAR n'a pas été trouvé dans les sous-répertoires du répertoire parent courant.")
    exit()

# Exécution du fichier JAR
os.system('npm start')
