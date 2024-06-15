# Course Full Stack open
## University of Helsinki
### Enrique Anton Lopez
## Part 0 Fundamentos de las aplicaciones web
### Exercices on folder part0 

The diagrams are in markdown format, which can be read directly on Github and in PNG. Thank you very much 
## Part 1 Introducción a React
### a - Introduccion a React
- Crear aplicacion mediante React y Vite
    ```shell     
     # npm 6.x (desactualizado, pero aun en uso por algunos):
     npm create vite@latest myAppReact --template react
     # npm 7+, el doble guion adicional es necesario:
     npm create vite@latest myAppReact -- --template react
    ```
- Ir a la carpeta de la aplicacion e nstalar dependencias  
    ```shell  
    cd myAppReact
     npm install
    ```
- Iniciar aplicacion
    ```shell
     npm run dev
    ```
- Vite inicia la aplicacion en [`localhost:5173`](localhost:5173), si el puerto 5173 esta ocupado,  en el [siguiente libre](https://es.vitejs.dev/config/server-options.html#server-port)
- En la carpeta `/src`, dejar solo los archivos `App.jsx`y `main.jsx`  con el codigo minimo. Elimnar el resto de archivos por ahora:
    `App.jsx`
    ```jsx
    const App = () => {
     return (
         <div>
         <p>Hello world</p>
         </div>
     )
     }
 
     export default App
    ```
    `main.jsx`
    ```jsx
    import ReactDOM from 'react-dom/client'
     import App from './App'
     ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    ```
#### Componentes
- El archivo `main.jsx` renderiza el componente `App.jsx` dentro de un div con el `id=root`
- La libreria `ReactDOM`se encarga del renderizado. 
- El componente `App.jsx`se importa en `main.jsx` mediante `import App from './App'` 
-  `export default App`permite que el componente se pueda importar desde otro archivo.
    ```jsx
    ...
     ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    ```
  - El archivo `main.jsx`es llamado desde el archivo `index.html`
  - Este archivo no se modifica. Todo el contenido se renderiza mediante componentes. 
    ```html
    <!doctype html>
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
        </head>
        <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
        </body>
    </html>  
    ```
  - En el archivo `App.js` se define una constante `const App`. Este sera el nombre del componente. 
  - A esta se le asigna una funcion sin parametros: `() => {return (...)}`
  - La funcion retorna el codigo `html` que es renderizado por React.
  - Dentro de la funcion se puede añadir codigo Javascript. 
 - 
    ```jsx
    const App = () => {
        const now = new Date()
        const a = 10
        const b = 20
        console.log(now, a+b)
    return (
        <div>
        <p>Hello world, it is {now.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
        </div>
        )
    }
    export default App
    ```
- Se imprimira un parrafo: `Hello world, it is `mas la fecha actual. En `now` guardaamos la fecha actual.
- `a`sera igual a 10, `b` = 20 
- En el html renderizado, entre bigotes `{}` se incluyen las variables y expresiones cuyo valor sera renderizado como html. 
-  `{a} plus {b} is {a + b}` => `10 plus 20 is 30`
- Los nombres de los componentes siempre deben comenzar por mayuscula
- 
##### JSX
- Lo que se ve como HTML en el `return`  de la funcion en realidad es JSX
- JSX es compilado por React a traves de [Babel](https://babeljs.io/repl/) como Javascript. Una vez compilado quedaria asi:
    ```js
    const App = () => {
    const now = new Date()
    const a = 10
    const b = 20
    return React.createElement(
        'div',
        null,
        React.createElement(
        'p', null, 'Hello world, it is ', now.toString()
        ),
        React.createElement(
        'p', null, a, ' plus ', b, ' is ', a + b
        )
    )
    }
    ```
- Visualmente JSX es muy parecido a HTML con la partiularidad de permite incrustar Javascript entre bigotes (llaves) 
- Es un lenguaje de plantillas como Thymeleaf pra Java Spring o jade-Pug, Handlebars, para Express.js
- La sintaxis es similar a XML:
- Todas las  etiquetas deben cerrarse: `<br>` se escribe `<br />`
- El JSX debe partir desde un unico elemento raiz. Puede ser cualquier elemento o una etiqueta vacia `<> ... </>` [fragments](https://es.react.dev/reference/react/Fragment)
- Entre las llaves `{}` solo se renderizan valores primitivos: numeros o strings. Esto daria error, ya que estamos intentando renderizar el contenido de cada objeto del array en vez del contenido de cada valor del objeto:
    ```jsx
    const App = () => {
    const friends = [
        { name: 'Peter', age: 4 },
        { name: 'Maya', age: 10 },
    ]
    ```
- MAL
    ```jsx
    return (
        <div>
        <p>{friends[0]}</p>
        <p>{friends[1]}</p>
        </div>
    )
    }
    export default App
    ```
- BIEN
  ```jsx
  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
  ```

- Si se renderizan arrays si el contenido de estos son numeros o cadenas. 
##### Uso de componentes
- Se pueden definir en el mismo archivo . Si es en archivo diferente poner `export default Componente` en el archivo e definicion e `import Component from './Componet'`en el archivo deonde se quiera implementar 
- Una  vez definido se puede utilizar todas las veces que se requiera
    ```jsx
    const Hello = () => {
    return (
        <div>
        <p>Hello world</p>
        </div>
    )
    }

    const App = () => {
    return (
        <div>
        <h1>Greetings</h1>
            <Hello />
            <Hello />
            <Hello />
        </div>
    )
    }

    ```
##### Pasar datos a componentes mediante [`props`](https://es.react.dev/learn/passing-props-to-a-component)
- Para definir componentes que contengan varibales externas se las pasamos mediante el objeto `props`como parametro.
- Dentro del JSX se pondran entre llaves los campos del componente que recibiran contenido desde fuera con la sintaxis `{props.campo}`
- Al utilizar los componentes  se pone como atributo el nombre del campo `=` al valor que se quiera, una variable o una expresion javascript entre llaves 
```jsx
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}
const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

```
#### Posible mensaje de error
- `name`is missing in props validation eslint, [react/prop-types](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md)
- causado por [ESlint](https://es.eslint.org/)
- Añadir la   linea `'react/prop-types': 0` al archivo `´`eslintrc.cjs`, en el array `rules`:
```json annotate
    ...
   rules: {
     'react-refresh/only-export-components': [
       'warn',
       { allowConstantExport: true },
     ],
     'react/prop-types': 0
   },
}
```
#### Creación mediante React
- Sin usar Vite, React crea las aplicaciones mediante el comando [`npx create-react-app my_app`](https://github.com/facebookincubator/create-react-app). 
- En este caso el nombre del  archivo de arranque sera `index.js` y no `main.jsx`. 
- La aplicacion se inicia con el comando `npm start`


> [React](https://es.react.dev/)
> [Vite](https://es.vitejs.dev/)
> [funciones de flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> [ECMAScript 6](http://es6-features.org/#Constants)
> [JSX](https://es.react.dev/learn/writing-markup-with-jsx)
### b - Javascript
### c - Estado del componente, controladores de eventos
### d - Un estado más complejo, depurando aplicaciones React

