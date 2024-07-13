# Course Full Stack open
## University of Helsinki
### Enrique Anton Lopez


0. [Parte 0: Fundamentos de las aplicaciones web](./doc/fundamentos.md)
   - Ejercicios: [part0](https://github.com/eanton71/_fullstackopen/tree/main/part0)
     - 0.1:leer [tutorial de HTML](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/HTML_basics)
     - 0.2:leer [tutorial de CSS](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/CSS_basics)
     - 0.3:leer [Mi primer formulario HTML](https://developer.mozilla.org/es/docs/Learn/Forms/Your_first_form)
     - 0.4: diagrama red XHR [pagina](https://studies.cs.helsinki.fi/exampleapp/notes) => [diagrama 0.4](https://github.com/eanton71/_fullstackopen/blob/main/part0/ex04.png)
     - 0.5: diagrama red crear nota SPA[pagina](https://studies.cs.helsinki.fi/exampleapp/spa) => [diagrama 0.5](https://github.com/eanton71/_fullstackopen/blob/main/part0/ex05.png)
     - 0.6: diagrama red crear nota SPA => [diagrama 0.6](https://github.com/eanton71/_fullstackopen/blob/main/part0/ex06.png)
1. [Parte 1: Introduccion a React](./doc/intro_react.md)
   - Ejercicios:
     -  [part1/courseinfo](https://github.com/eanton71/_fullstackopen/tree/main/part1/courseinfo)
        - 1.1: inforamcion del curso
        - 1.2: refactorizar Content
        - 1.3: refactorizar variables con datos y app
        - 1.4: refactorizar datos a un array
        - 1.5: refactorizar datos a un objeto 
     -  [part1/unicafe](https://github.com/eanton71/_fullstackopen/tree/main/part1/unicafe) 
        -  1.6: aplicacion de comentarios con gestion de  estados
        -  1.7: añadir estadisticas
        -  1.8: refactorizar componente `Statistics`
        -  1.9: esperar comentarios para mostrar estadisticas
        -  1.10: extraer componentes `Button` y `StatisticLine`
        -  1.11: mostrar estadistica en tabla HTML
     -  [part1/anecdotes](https://github.com/eanton71/_fullstackopen/tree/main/part1/anecdotes)
        -   1.12: aplicacion con frases aleatorias
        -   1.13: añadir votacion por la anecdota o frase
        -   1.14: mostar frase o anecdota con mayor numero de votos
2. [Parte 2: Comuicandose con el servidor](./doc/comunica_servidor.md)
      - Ejercicios:
        - [part2/courseinfo](https://github.com/eanton71/_fullstackopen/tree/main/part2/courseinfo) 
          -  2.1: inforamcoin del curso con servidor 
          -  2.2: mostrar suma de ejercicios
          -  2.3: calcular suma e ejercicios con `array.reduce`
          -  2.4: permitir un numero arbitrario de cursos
          -  2.5: Refactorizr Course como modulo separado
        - [part2/phonebook](https://github.com/eanton71/_fullstackopen/tree/main/part2/phonebook)
          - 2.6:   agenda telefonica con nombres
          - 2.7: comprobar el si el nuevo usuario ya existe en la agenda 
          - 2.8: incluir numeros de telefono
          - 2.9: filtrar por nombre
          - 2.10: refactorizar en varios componentes
          - 2.11: alamacenar estado inical en `db.json`
          - 2.12: guardar ps datos en el servidor backend
          - 2.13: modulo aparte para gestionar backend
          - 2.14: eliminar entradas de la BD
          - 2.15: comprobar que el nuevo usuario existe, si es aasi actuazliar nueevo numero
          - 2.16: mensajes de error con estilo
          - 2.17: gestionar errores en las promesas
        - [part2/countries]()
          - 2.18: aplicacion con información sobre paises. Obtener datos de [helsinki countries](https://studies.cs.helsinki.fi/restcountries/). Input con filtrado. Cuando el filtrado da <= 10 resultados, se muestran los nombres de paises. Cuando se da un resultado, muestra varios datos: capital, area, bandera, idiomas
          - 2.19: colocar un boton junto al nombre de cada pais  para mostar la información
          - 2.20: agregar info meteorologica . Por ejmplo [openweathermap](https://openweathermap.org/)


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
##### Puertos ocupados
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

