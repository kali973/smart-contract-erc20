import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

host = "localhost"
port = "5432"
user = "postgres"
password = "solarix"
dbname = "blockchain"

# Connexion au serveur PostgreSQL
conn = psycopg2.connect(
    host=host,
    port=port,
    user=user,
    password=password
)
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

# Suppression de la base de données "blockchain" si elle existe
cur = conn.cursor()
cur.execute("DROP DATABASE IF EXISTS {}".format(dbname))
cur.execute('CREATE DATABASE {};'.format(dbname))
conn.commit()

# Fermeture du curseur et de la connexion
cur.close()
conn.close()

# Connexion à la base de données "blockchain"
conn = psycopg2.connect(
    host=host,
    port=port,
    user=user,
    password=password,
    dbname=dbname
)

# Création de la table "blocks"
cur = conn.cursor()
cur.execute('''
    CREATE TABLE IF NOT EXISTS blocks (
        id SERIAL PRIMARY KEY,
        number BIGINT NOT NULL,
        hash TEXT NOT NULL,
        parent_hash TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        nonce BIGINT NOT NULL
    )
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS blocks_number_idx ON blocks (number)
''')
conn.commit()

# Création de la table "proprietaires"
cur.execute('''
    CREATE TABLE IF NOT EXISTS proprietaires (
        id SERIAL PRIMARY KEY,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        adresse TEXT NOT NULL,
        telephone TEXT,
        email TEXT,
        date_naissance DATE,
        profession TEXT,
        revenu_annuel NUMERIC,
        statut_marital TEXT,
        nb_enfants INTEGER,
        date_achat DATE,
        cout_achat NUMERIC,
        garantie TEXT,
        fin_garantie DATE,
        etat TEXT,
        autre_info TEXT
    )
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS proprietaires_nom_prenom_adresse_uq ON proprietaires (nom, prenom, adresse)
''')
conn.commit()

# Création de la table "actif"
cur.execute('''
    CREATE TABLE IF NOT EXISTS actif (
        id SERIAL PRIMARY KEY,
        power NUMERIC(36, 18) NOT NULL,
        efficiency NUMERIC(36, 18) NOT NULL,
        quantity INTEGER NOT NULL,
        surface NUMERIC(36, 18) NOT NULL,
        manufacturer TEXT NOT NULL,
        model TEXT NOT NULL,
        token TEXT NOT NULL,
        tokenAddress TEXT NOT NULL,
        geoLocation POINT,
        energyProduction NUMERIC(36, 18) NOT NULL,
        productionLimit NUMERIC(36, 18) NOT NULL,
        producer TEXT NOT NULL,
        proprietaire_id INTEGER REFERENCES proprietaires(id),
        block_id INTEGER REFERENCES blocks (id)
    )
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS actif_producer_idx ON actif (producer)
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS actif_proprietaire_id_idx ON actif (proprietaire_id)
''')
conn.commit()

# Création de la table "addresses"
cur.execute('''
    CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        address TEXT NOT NULL
    )
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS addresses_address_uq ON addresses (address)
''')
conn.commit()

# Création de la table "transactions"
cur = conn.cursor()
cur.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        hash TEXT NOT NULL,
        block_id INTEGER NOT NULL,
        nonce BIGINT NOT NULL,
        from_address TEXT NOT NULL,
        to_address TEXT NOT NULL,
        value NUMERIC(36, 18) NOT NULL,
        gas_limit BIGINT NOT NULL,
        gas_price NUMERIC(36, 18) NOT NULL,
        input TEXT NOT NULL,
        token TEXT NOT NULL
    )
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS transactions_block_id_idx ON transactions (block_id)
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS transactions_from_address_idx ON transactions (from_address)
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS transactions_to_address_idx ON transactions (to_address)
''')
conn.commit()

# Création de la table "balances"
cur.execute('''
    CREATE TABLE IF NOT EXISTS balances (
        id SERIAL PRIMARY KEY,
        address_id INTEGER NOT NULL,
        balance NUMERIC(36, 18) NOT NULL
    );
''')
cur.execute('''
    CREATE INDEX IF NOT EXISTS balances_address_id_idx ON balances (address_id);
''')
conn.commit()

# Fermeture de la connexion à la base de données
cur.close()
conn.close()

print("Finished create database")
input("Press Enter to continue...")
