- ajouté le compilateur solc dans le dossier resources
- ajouté le plugin web3j dans le fichier build.gradle
- ajouté la configuration de Solidity dans le fichier build.gradle
- ajouté la dépendance de web3j dans le fichier build.gradle

https://github.com/web3j/web3j-gradle-plugin
Après l'application du plugin, le répertoire de base pour le code généré (par défaut $buildDir/generated/sources/web3j)
contiendra un répertoire pour chaque ensemble de sources (par défaut main et test) contenant les classes Java pour les
enveloppes de contrats intelligents.

Par défaut, tous les fichiers .sol dans $projectDir/src/main/solidity seront traités par le plugin. Pour spécifier et
ajouter différents ensembles de sources, utilisez le DSL sourceSets:

https://github.com/web3j/solidity-gradle-plugin

La version 7.x de Gradle ne fonctionne pas avec le plugin Solidity. Ainsi, une version antérieure a été utilisée.
