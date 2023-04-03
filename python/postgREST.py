import docker
import os

client = docker.from_env()
image_name = 'postgrest/postgrest'
container_name = 'postgrest_container'

try:
    client.images.pull(image_name)
    print('Image pulled successfully')
except docker.errors.APIError as e:
    print(f'Error while pulling image: {e}')

try:
    container = client.containers.run(
        image=image_name,
        name=container_name,
        detach=True,
        remove=True,
        ports={'3000/tcp': 3000},
        environment={
            'PGRST_DB_HOST': 'localhost',
            'PGRST_DB_PORT': '5432',
            'PGRST_DB_USER': 'postgres',
            'PGRST_DB_PASSWORD': 'solarix',
            'PGRST_DB_NAME': 'blockchain'
        }
    )
    print('Container started successfully')
except docker.errors.APIError as e:
    print(f'Error while starting container: {e}')

try:
    compose_data = """version: '3'
services:
  postgrest:
    image: postgrest/postgrest
    environment:
      PGRST_DB_URI: postgres://postgres:solarix@localhost:5432/blockchain
      PGRST_DB_SCHEMA: public
      PGRST_DB_ANON_ROLE: "web_anon"
      PGRST_SERVER_PORT: "3000"
    ports:
      - "3000:3000"
"""
    compose_file_path = os.path.abspath('../docker-compose.yml')
    with open(compose_file_path, 'w') as f:
        f.write(compose_data)

    compose = client.containers.run(
        'docker/compose:1.29.2',
        name='compose_container',
        volumes={
            '/var/run/docker.sock': {'bind': '/var/run/docker.sock', 'mode': 'rw'},
            compose_file_path: {'bind': '/app/docker-compose.yml', 'mode': 'ro'},
        },
        command=['up', '-d'],
        working_dir='/app',
        remove=True
    )
    print('Compose file executed successfully')
except docker.errors.APIError as e:
    print(f'Error while executing compose file: {e}')
