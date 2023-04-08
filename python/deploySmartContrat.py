import os
import subprocess


def find_and_deploy(start_dir):
    for root, dirs, files in os.walk(os.path.abspath(os.path.join(start_dir, os.pardir))):
        if "hardhat.config.js" in files:
            deploy_file_path = os.path.join(root, "hardhat.config.js")
            os.chdir(root)
            os.system("yarn deploy:aurora")
            print(f"Le fichier deploy.js a été trouvé dans {deploy_file_path} et la commande yarn deploy:aurora a été exécutée.")
            return

    print("Le fichier deploy.js n'a pas été trouvé dans le projet.")

if __name__ == '__main__':
    find_and_deploy('.')

print(" ")
print("Finished create database")
input("Press Enter to continue...")