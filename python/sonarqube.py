import os
import webbrowser

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

host = "localhost"
port = "5432"
user = "postgres"
password = "solarix"
dbname = "sonarqube"

# Connexion au serveur PostgreSQL
conn = psycopg2.connect(
    host=host,
    port=port,
    user=user,
    password=password
)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

# Vérification si la base de données "sonarqube" existe
cur = conn.cursor()
cur.execute(f"SELECT 1 FROM pg_database WHERE datname='{dbname}'")
exists = cur.fetchone()

# Si la base de données n'existe pas, elle est créée
if not exists:
    cur.execute(f'CREATE DATABASE {dbname}')
    print(f"La base de données {dbname} a été créée.")

# Fermeture de la connexion
cur.close()
conn.close()


# Recherche du fichier settings.gradle dans le projet
def find_settings_gradle(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if filename == "settings.gradle":
            return filepath
        elif os.path.isdir(filepath):
            result = find_settings_gradle(filepath)
            if result is not None:
                return result
    # Si on a parcouru tous les fichiers et dossiers sans trouver le fichier, on retourne None
    return None


start_dir = os.getcwd()
parent_dir = os.path.abspath(os.path.join(start_dir, os.pardir))
os.chdir(os.path.join(parent_dir, "smart-contract-deployment"))
deploy_file_path = find_settings_gradle(os.getcwd())

if deploy_file_path:
    # Exécution de la commande Gradle pour exécuter SonarQube
    os.chdir(os.path.dirname(deploy_file_path))
    os.system(
        'gradlew.bat sonar -Dsonar.projectKey=solarix -Dsonar.projectName=solarix -Dsonar.host.url=http://127.0.0.1:9000 -Dsonar.token=sqp_8e02d1cf289d9d45c9dca4ff2b397663ce8f79c6')
    print(
        f"Le fichier settings.gradle a été trouvé dans {deploy_file_path} et la commande Gradle pour exécuter SonarQube a été exécutée.")
else:
    print("Le fichier settings.gradle n'a pas été trouvé dans le projet.")

# Ouverture de SonarQube dans le navigateur
webbrowser.open('http://127.0.0.1:9000')
