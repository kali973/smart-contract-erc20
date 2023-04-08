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

# Suppression de la base de données "sonarqube" si elle existe
cur = conn.cursor()
cur.execute("DROP DATABASE IF EXISTS {}".format(dbname))
cur.execute('CREATE DATABASE {};'.format(dbname))
conn.commit()

# Fermeture de la connexion
cur.close()
conn.close()

webbrowser.open('http://127.0.0.1:9000')