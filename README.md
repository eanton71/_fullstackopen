# Course Full Stack open
## University of Helsinki
### Enrique Anton Lopez


0. [Parte 0: Fundamentos de las aplicaciones web](./doc/fundamentos.md)
   - Ejercicios: [part0](https://github.com/eanton71/_fullstackopen/tree/main/part0)
1. [Parte 1: Introduccion a React](./doc/intro_react.md)
   - Ejercicios:
     -  [part1/courseinfo](https://github.com/eanton71/_fullstackopen/tree/main/part1/courseinfo), 1.1-1.5
     -  [part1/unicafe](https://github.com/eanton71/_fullstackopen/tree/main/part1/unicafe), 1.6-1.11
     -  [part1/anecdotes](https://github.com/eanton71/_fullstackopen/tree/main/part1/anecdotes), 1.12-1.14
2. [Parte 2: Comuicandose con el servidor](./doc/comunica_servidor.md)
      - Ejercicios:
        - [part2/courseinfo](https://github.com/eanton71/_fullstackopen/tree/main/part2/courseinfo) , 2.1-2.5


#### Instalaciones
##### Crear aplicacion en React con Vite
- [intro React](https://github.com/eanton71/_fullstackopen/blob/main/doc/intro_react.md#a---introduccion-a-react)   
##### Instalar servidor JSON
- [Parte 2, configuracion JSON Server]()
`npm install json-server --save-dev`
##### Instalar axios
- [Parte 2, configuracion JSON Server]()
`npm install axios`
Modificar `package.json`
```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "json-server --port 3001 --watch db.json"
  },
  ```

#### Problemas y soluciones

##### Posible mensaje de error

- `name`is missing in props validation eslint, [react/prop-types](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md)
- causado por [ESlint](https://es.eslint.org/)
- Añadir la linea `'react/prop-types': 0` al archivo `´`eslintrc.cjs`, en el array `rules`:

```json
    rules: {
     'react-refresh/only-export-components': [
       'warn',
       { allowConstantExport: true },
     ],
     'react/prop-types': 0
   },
```
##### Puertos ocupados
Cannot bind to the port 3001. Please specify another port number either through --port argument or through the json-server.json configuration file
- YA hay un servicio ejecutandose en ese puerto, parapra ese ervicio, configurar con otro `puerto, eteccc
##### Archivo DS_store en mac

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

> [https://stackoverflow.com/questions/107701/how-can-i-remove-ds-store-files-from-a-git-repository](how-can-i-remove-ds-store-files-from-a-git-repository)

