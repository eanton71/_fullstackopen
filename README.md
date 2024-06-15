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
```json
   ,,,
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

#### Variables
- Formas de definir variables
    - `var`, forma antigua  de defnir variabnles. Se desaconseja
    - `const`, constante. El valor no puede cambiar
    - `let`, variable normal
- const y let se utilizan desde ES6
> [var, let y const: ¿Cuál es la diferencia?](https://www.freecodecamp.org/espanol/news/var-let-y-const-cual-es-la-diferencia/)
> [Diferencia entre var y let en JavaScript](https://htmlmasters.tech/diferencia-entre-var-y-let-en-javascript/)
> [var, let y const - Qué, por qué y cómo - Características de JavaScript de ES6](https://youtu.be/sjyJBL5fkp8)


#### [Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)

```js
    
    const t = [1, -1, 3]
    t.push(5)

    console.log(t.length) // se imprime 4
    console.log(t[1])     // se imprime -1

    t.forEach(value => {
    console.log(value)  // se imprimen los números 1, -1, 3, 5 cada uno en su propia línea
    })                    
```
- Se define como `const`pero el contenido se puede modificar
- El array es un objeto por tanto la variable apunta al mimo objeto siempre aunqque se modifique el contenido de algun elemento
- [`forEach`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) permite iterar por su contenido. Reciber una funcion flecha. Para cada uno de los elementos value le aplica una funcion. En este caso imprime por consola
-  `push`agrega nelementos nuevos al array
- En React se usa a menudo la programacion fiuncional. En esta se usan los objetos [inmutalbes](https://es.wikipedia.org/wiki/Objeto_inmutable)
- En React es mas correcto usar [`concat`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)que crea un nuevo array a poartir del array anterior  mas un trozo nuevo
```js


        const t = [1, -1, 3]
        const t2 = t.concat(5) // crea un nuevo array
        console.log(t)  // se imprime [1, -1, 3]
        console.log(t2) // se imprime [1, -1, 3, 5]

```
- [`map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Crea un nuevo array . PErmite transofra el array de muchas  maneras
```js


        const t = [1, 2, 3]
        const m1 = t.map(value => value * 2)
        console.log(m1) // se imprime [2, 4, 6]
        const m2 = t.map(value => '<li>' + value + '</li>')
        console.log(m2)
        // se imprime [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
```

- [Asignación de desestructuración](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Es una manera de asignar a variables los eleemtnos del array
```js


        const t = [1, 2, 3, 4, 5]
        const [first, second, ...rest] = t
        console.log(first, second)  // se imprime 1, 2
        console.log(rest)          // se imprime [3, 4 ,5]
```

#### Objetos

- Enrtre las formas de defnir objetos en Javascript esta la de usar [objetos literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals). Enuerar las propiedades entre llaves
```js


        const object1 = {
        name: 'Arto Hellas',
        age: 35,
        education: 'PhD',
        }

        const object2 = {
        name: 'Full Stack web application development',
        level: 'intermediate studies',
        size: 5,
        }

        const object3 = {
        name: {
            first: 'Dan',
            last: 'Abramov',
        },
        grades: [2, 3, 5, 3],
        department: 'Stanford University',
        }
```
- Los valores pueden tomar cualquier tipo: entero, string, array, objeto,...
- Si se quiere accder a las propiedades de un objeto se puede usar la notacion de 'punto' o usar corchetes
- Tambien se pueden modificar o agragar propiedades de la mima manera
- A las propiedades que ocntengan espacios en su definicon se debe aceer mediante corchetes
- Los objtos tabien pueden tener metodos
- Los osbjteos tabmbien se pueden definir mediante las funciones de constructor igual que en Java ==, aunque Javascript no tiene clases como los lenguajes otientados a objetos==. Desde ES6 tiene sintaxis de clase
```js


        console.log(object1.name)         // se imprime Arto Hellas
        const fieldName = 'age'
        console.log(object1[fieldName])    // se imprime 35

        object1.address = 'Helsinki'
        object1['secret number'] = 12341
```

#### Funciones

- Definicion de funciones flecha. 
```js


        const sum = (p1, p2) => { 
        console.log (p1) 
        console.log (p2) 
        return p1 + p2 
        } 
```
- Llamada a la funcion
```js


        const result = sum(1, 5)
        console.log (result)
```
- Si hay un solo parametro se pude  obmitir los parentesis. 
- Si solo contiene una expresion las llaves no son necesarias
```js
        const square = p => p * p
```
- Se puede aplicar con el metodo `map` de arrays

```js


        const t = [1, 2, 3]
        const tSquared = t.map(p => p * p)
        // tSquared ahora es [1, 4, 9]
```
- Antes de ES6 solo se podian definir mediante `function`.
- Se puede hacer mediadnte [declaración de función](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/function)
```js

function product(a, b) {
  return a * b
}
const result = product(2, 6)
// result ahora es 12
```
- O medainte [expresión de función](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/function)
```js
//Asignandola a una constante
const average = function(a, b) {
  return (a + b) / 2
}
const result = average(2, 5)
// result ahora es 3.5
```

#### Clases


> [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript), estandar Javascript
> [ECMAScript® 2023, ES14](https://www.ecma-international.org/ecma-262/), ultima version del estandar
> [Babel](https://babeljs.io/), transpilador.
> - Permite entre otras cosas adaptar codogio JAvascript moderno a otro antiguo que pueda ser soportado por navegadores que no soportan aun funcionalidades modernas.
> 
> [Node.js](https://nodejs.org/en/), entorno d ejecucion de Javascript basado en [V8](https://developers.google.com/v8/) de Google. 
> - Funciona en servidores y moviles entre  otors dispositivos. 
> - Esta actualizado a la ultima version e Javascript. 
> - Los archivos javascript `js`se ejecutan mediante el comando `node archivo.js`
> - Desde la consola de Node.js se puede escribir codigo Javascript
### c - Estado del componente, controladores de eventos
### d - Un estado más complejo, depurando aplicaciones React

