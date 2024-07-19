# Parte 3 Programando un servidor con NodeJS y Express

## a Node.js y Express

- El backend se construye a partir de [NodeJS](https://nodejs.org/en/), entorno de ejecución basado en JavaScript y en el ,otor [Chrome V8](https://developers.google.com/v8/) de Google

- Utilizar la ultima versión de Node. `node -v`nos da la versión

- En NodeJS no es necesario el uso de transpiladores como Babel,  ya que   es compatible con la mayoría del JavaScript moderno

- Usaremos [npm](https://docs.npmjs.com/about-npm). Este sistema se creo para NodeJS
### Crear aplicacion NodeJS
### Crear aplicación NodeJS

- Ir al directorio que será la raíz de la aplicación, desde la consola, cmd, bash, zsh, ..
- `npm init`
- Se crea un archivo `package.json`
    ````json
    {
    "name": "backend",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Matti Luukkainen",
    "license": "MIT"
    }
    ````
- En `"main"`: se define el punto de entrada  de la aplicación `index.js`
- Agregamos un nuevo comando en `"scripts"`
    ````json
    {
        // ...
        "scripts": {
            "start": "node index.js",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        // ...
    }
    ````
- Agregamos un archivo `index.js` con el código `console.log('hello world')`
- Desde la consola podemos ejecutar `node index.js` o mediante el comando que añadimos `npm start`, que a su vez ejecuta la linea de script que contiene
- Si ejecutamos `npm test`nos dará el mensaje `"echo \"Error: no test specified\" && exit 1"`

### Convertir la aplicacion en un servidor web simple
- Editamos el archivo `index.js`
    ````js
    const http = require('http')

    const app = http.createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('Hello World')
    })

    const PORT = 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
    ````
- La ejecución muestra el mansaje por consola:
- `Server running on port 3001`
- Si vamos a la dirección `http://localhost:3001/` en el navegador nos mostrara el texto `Hello World`.
- De hecho si vamos a `http://localhost:3001/`seguido de cualquier cosa nos dará la misma pagina.
- &#128064; ¡Si el puerto `3001` esta en uso no dará error al ejecutar la aplicación!. &#128170; Apagar esa aplicación o usar un puerto diferente
- Como funciona? &#129497;
- `const http = require('http')`, aqui importamos el modulo [`http`](https://nodejs.org/docs/latest-v18.x/api/http.html)
- En NodeJS se usan modulos [`CommonJS`](https://es.wikipedia.org/wiki/CommonJS). Esto e asi porque NodeJS usaba modlos desde mucho antes de que fueran admitidos en Javascript. NodeJS es compatible con `ES6` pero no del todo, por lo que es recomendable usar CommomJS.
    ````js
    const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
    })
    ````
- Usamos el metodo `createServer` de `http` para crear un servidor web.
- Se registra un controlador de eventos en el servidor que se ejecuta cada vez que se realiza una solitud HTTP a la direccion `http://localhost:3001/`.
- En `response.writeHead` se coloca el codigo de estado 200 y el contenido del sitio en `response.end`.
- Enlazamos app con el puerto 3001
    ````js
    const PORT = 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
    ````
- Por ahora el servidor ofrecerá datos en formato JSON.
- Creamos un servidor json para mostrar las notas.
    ````js
    const http = require('http')

    let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
    ]
    const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
    })

    const PORT = 3001
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)
    ```
- La respuesta se muestra en formato Json mediante `JSON.stringify(notes)`. Se comporta como `json-server`.
### Servidor fácil con librería [Express](http://expressjs.com/)

- Nos facilita la tarea de construir un servidor. Para instalarlo:
- `npm install express`
- Cambiamos la aplicación:
    ````js
    const express = require('express')
    const app = express()

    let notes = [
    ...
    ]

    app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    })

    app.get('/api/notes', (request, response) => {
    response.json(notes)
    })

    const PORT = 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
    ````
    - Esta vez importamos `express`  y la guardamos en la variable `app`
    - Definimos dos rutas:
      -  una a la raiz : get `/` que retorna Hello World! en encabezado `h1`
      -  Elo parametro [request](http://expressjs.com/en/4x/api.html#req) contine la inforamcion de la solicitud HTTP
      -  El parametro [response](http://expressjs.com/en/4x/api.html#res) define como se responde a la solicitud
      -  Hacemos uso del metodo `send`de `response`, donde se envia el string con las etiquetas `h1`
      -  Como es un string el valor _`content-Type`_ de la cabecera queda establecido en  _`text/html`_
      -  El codigo de estado es 200
      -  La segunda ruta: get  `/api/notes`, nos devuelve la lista e notas en formato `json`. Ahora no hay que usar JSON.stringify
### Node por consola
- [node-repl](https://nodejs.org/docs/latest-v18.x/api/repl.html): nos permite accder a los comandos de NodeJS a traves de consola
- SE accede ejecutando `node`. 
### Gestión de  librerías en NodeJS

- Después de la instalación la dependencia se ha añadido al archivo `package.json`:
    ````json
    {
    // ...
    "dependencies": {
        "express": "^4.18.2"
    }
    }
    ````
- Y el código fuente del modulo o librería se ha añadido al la carpeta `node_modules`en la raíz de la aplicación. En esta carpeta se instalaran las demás librerías

- `"express": "^4.18.2"`, ¿Qué significa el signo `^`de intercalación delante del umero de versión del modulo?  
  - [<strong>`control de versiones semantico`</strong>](https://docs.npmjs.com/about-semantic-versioning) :cuando se actualicen las dependencias del proyecto, la versión de Express será al menos 4.18.2. Los dos números `18`, menor y `2`, parche, pueden ser mas grandes, `4`, mayor debe ser igual
- `npm update`, actualiza las dependencias.
- `npm install`, instala todas las dependencias. Útil si bajas el proyecto desde GitHub.
- Si el numero `mayor`no cambia se garantiza que las [versiones mas modernas funcionaran en el proyecto](https://es.wikipedia.org/wiki/Retrocompatibilidad), pero si actualizamos a una versión  mayor 5, puede [dar problemas](https://expressjs.com/en/guide/migrating-5.html)

### Nodemon, hacer cambios sin reiniciar
- `nodemons`observa los archivos de la aplicacion, si ve que alguno cambia reinicia automaticamente
- Lo instalamos como dependencia de desarrollo:
- `npm install --save-dev nodemon`
- El archivo  `package.json`se habra modificado asi:
    ````json
    {
    //...
    "dependencies": {
        "express": "^4.18.2",
    },
    "devDependencies": {
        "nodemon": "^3.0.3"
    }
    }
    ````
- Las depedncias de desarrollo no son necesarias en modo de produccion.
- Para iniciar nodemon:
- `node_modules/.bin/nodemon index.js`
- Podemos incluir este script en `package.json`
    ````json
    {
    // ..
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ..
    }
    ````
    - Ahora se ejecuta: `npm run dev`
- El servidor se recarga solo pero el navegador no. Esta funcionalidad si esta en [React](https://gaearon.github.io/react-hot-loader/getstarted/)
- 
### REST

### Obteniendo un solo recurso
### Eliminar recursos
### Postman
### El cliente REST de Visual Studio Code
### El Cliente HTTP de WebStorm
### Recibiendo información
### Acerca de los tipos de solicitudes HTTP
### Middleware
## b Despliegue de la aplicación a Internet
### Política de mismo origen y CORS
### Aplicación a Internet
### Frontend production build
### Sirviendo archivos estáticos desde el backend
### La aplicación completa en Internet
### Optimizando el despliegue del frontend
### Proxy 
## c Guardando datos en MongoDB
### Depuración en aplicaciones de Node
### MongoDB
### Schema
### Crear y guardar objetos
### Obteniendo objetos de la base de datos 
### Backend conectado a una base de datos
### Moviendo la configuración de la base de datos a su propio módulo
### Nota importante para usuarios de Fly.io
### Usando la base de datos en los controladores de ruta
### Verificación de la integración de frontend y backend
### Ejercicios 3.13.-3.14.
### Manejo de errores
### Mover el manejo de errores al middleware
### El orden de carga del middleware
### Otras operaciones
### Un verdadero juramento de desarrollador full stack 
## d Validación y ESLint
### Desplegando el backend con base de datos a producción 
### Lint

