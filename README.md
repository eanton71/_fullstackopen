# Course Full Stack open
## University of Helsinki
### Enrique Anton Lopez


0. [Part 0: Fundamentos de las aplicaciones web](./doc/fundamentos.md)
1. [Part 1: Introduccion a React](./doc/intro_react.md)


#### Problemas
Archivo DS_store en mac

```
Remove existing .DS_Store files from the repository:

find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
Add this line:

.DS_Store
to the file .gitignore, which can be found at the top level of your repository (or create the file if it isn't there already). You can do this easily with this command in the top directory:

echo .DS_Store >> .gitignore
Then commit the file to the repo:

git add .gitignore
git commit -m '.DS_Store banished!'
```
https://stackoverflow.com/questions/107701/how-can-i-remove-ds-store-files-from-a-git-repository