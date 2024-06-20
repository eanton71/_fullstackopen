# Part 1 Introducción a React

## a - Introduccion a React

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
- Vite inicia la aplicacion en [`localhost:5173`](localhost:5173), si el puerto 5173 esta ocupado, en el [siguiente libre](https://es.vitejs.dev/config/server-options.html#server-port)
- En la carpeta `/src`, dejar solo los archivos `App.jsx`y `main.jsx` con el codigo minimo. Elimnar el resto de archivos por ahora:  
   `App.jsx`

  ```jsx
  const App = () => {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  };

  export default App;
  ```

  `main.jsx`

  ```jsx
  import ReactDOM from "react-dom/client";
  import App from "./App";
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  ```

### Componentes

- El archivo `main.jsx` renderiza el componente `App.jsx` dentro de un div con el `id=root`
- La libreria `ReactDOM`se encarga del renderizado.
- El componente `App.jsx`se importa en `main.jsx` mediante `import App from './App'`
- `export default App`permite que el componente se pueda importar desde otro archivo.
  ```jsx
  ...
   ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  ```
- El archivo `main.jsx`es llamado desde el archivo `index.html`
- Este archivo no se modifica. Todo el contenido se renderiza mediante componentes.
  ```html
  <!DOCTYPE html>
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
- ```jsx
  const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;
    console.log(now, a + b);
    return (
      <div>
        <p>Hello world, it is {now.toString()}</p>
        <p>
          {a} plus {b} is {a + b}
        </p>
      </div>
    );
  };
  export default App;
  ```
- Se imprimira un parrafo: `Hello world, it is `mas la fecha actual. En `now` guardaamos la fecha actual.
- `a`sera igual a 10, `b` = 20
- En el html renderizado, entre bigotes `{}` se incluyen las variables y expresiones cuyo valor sera renderizado como html.
- `{a} plus {b} is {a + b}` => `10 plus 20 is 30`
- Los nombres de los componentes siempre deben comenzar por mayuscula

#### JSX

- Lo que se ve como HTML en el `return` de la funcion en realidad es JSX
- JSX es compilado por React a traves de [Babel](https://babeljs.io/repl/) como Javascript. Una vez compilado quedaria asi:
  ```js
  const App = () => {
    const now = new Date();
    const a = 10;
    const b = 20;
    return React.createElement(
      "div",
      null,
      React.createElement("p", null, "Hello world, it is ", now.toString()),
      React.createElement("p", null, a, " plus ", b, " is ", a + b)
    );
  };
  ```
- Visualmente JSX es muy parecido a HTML con la partiularidad de permite incrustar Javascript entre bigotes (llaves)
- Es un lenguaje de plantillas como Thymeleaf pra Java Spring o jade-Pug, Handlebars, para Express.js
- La sintaxis es similar a XML:
- Todas las etiquetas deben cerrarse: `<br>` se escribe `<br />`
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
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>
    </div>
  );
  ```

- Si se renderizan arrays si el contenido de estos son numeros o cadenas.

#### Uso de componentes

- Se pueden definir en el mismo archivo . Si es en archivo diferente poner `export default Componente` en el archivo e definicion e `import Component from './Componet'`en el archivo deonde se quiera implementar
- Una vez definido se puede utilizar todas las veces que se requiera

  ```jsx
  const Hello = () => {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  };

  const App = () => {
    return (
      <div>
        <h1>Greetings</h1>
        <Hello />
        <Hello />
        <Hello />
      </div>
    );
  };
  ```

#### No definir componentes dentro de los componentes   
- <span style="color:red" >NO</span>
```jsx
const App = () => {
  const [value, setValue] = useState(10)
    ,,,
  // No definas componentes adentro de otro componente
  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
     ```
    </div>
  )
}
```
- <span style="color:green"> SI</span>
```jsx
const App = () => {
  const [value, setValue] = useState(10)
    ,,,
  // No definas componentes adentro de otro componente
  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
     ```
    </div>
  )
}
```
- No se recomienda definir componentes dentro de otros componentes ya que puede generar problemas de renderizado
- CAda componente debe estar separado aunque esten en el mimo archivo
#### Pasar datos a componentes mediante [`props`](https://es.react.dev/learn/passing-props-to-a-component)

- Para definir componentes que contengan varibales externas se las pasamos mediante el objeto `props`como parametro.
- Dentro del JSX se pondran entre llaves los campos del componente que recibiran contenido desde fuera con la sintaxis `{props.campo}`
- Al utilizar los componentes se pone como atributo el nombre del campo `=` al valor que se quiera, una variable o una expresion javascript entre llaves

```jsx
const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};
const App = () => {
  const name = "Peter";
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};
```

### Posible mensaje de error

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

### Creación mediante React

- Sin usar Vite, React crea las aplicaciones mediante el comando [`npx create-react-app my_app`](https://github.com/facebookincubator/create-react-app).
- En este caso el nombre del archivo de arranque sera `index.js` y no `main.jsx`.
- La aplicacion se inicia con el comando `npm start`

> [React](https://es.react.dev/) > [Vite](https://es.vitejs.dev/) > [funciones de flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions) > [ECMAScript 6](http://es6-features.org/#Constants) > [JSX](https://es.react.dev/learn/writing-markup-with-jsx)

## b - Javascript

### Variables

- Formas de definir variables
  - `var`, forma antigua de defnir variabnles. Se desaconseja
  - `const`, constante. El valor no puede cambiar
  - `let`, variable normal
- const y let se utilizan desde ES6
  > [var, let y const: ¿Cuál es la diferencia?](https://www.freecodecamp.org/espanol/news/var-let-y-const-cual-es-la-diferencia/) > [Diferencia entre var y let en JavaScript](https://htmlmasters.tech/diferencia-entre-var-y-let-en-javascript/) > [var, let y const - Qué, por qué y cómo - Características de JavaScript de ES6](https://youtu.be/sjyJBL5fkp8)

### [Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)

```js
const t = [1, -1, 3];
t.push(5);

console.log(t.length); // se imprime 4
console.log(t[1]); // se imprime -1

t.forEach((value) => {
  console.log(value); // se imprimen los números 1, -1, 3, 5 cada uno en su propia línea
});
```

- Se define como `const`pero el contenido se puede modificar
- El array es un objeto por tanto la variable apunta al mimo objeto siempre aunqque se modifique el contenido de algun elemento
- [`forEach`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) permite iterar por su contenido. Reciber una funcion flecha. Para cada uno de los elementos value le aplica una funcion. En este caso imprime por consola
- `push`agrega nelementos nuevos al array
- En React se usa a menudo la programacion fiuncional. En esta se usan los objetos [inmutalbes](https://es.wikipedia.org/wiki/Objeto_inmutable)
- En React es mas correcto usar [`concat`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)que crea un nuevo array a poartir del array anterior mas un trozo nuevo

```js
const t = [1, -1, 3];
const t2 = t.concat(5); // crea un nuevo array
console.log(t); // se imprime [1, -1, 3]
console.log(t2); // se imprime [1, -1, 3, 5]
```

- [`map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map). Crea un nuevo array . PErmite transofra el array de muchas maneras

```js
const t = [1, 2, 3];
const m1 = t.map((value) => value * 2);
console.log(m1); // se imprime [2, 4, 6]
const m2 = t.map((value) => "<li>" + value + "</li>");
console.log(m2);
// se imprime [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
```

- [Asignación de desestructuración](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Es una manera de asignar a variables los eleemtnos del array

```js
const t = [1, 2, 3, 4, 5];
const [first, second, ...rest] = t;
console.log(first, second); // se imprime 1, 2
console.log(rest); // se imprime [3, 4 ,5]
```

### Objetos

- Enrtre las formas de defnir objetos en Javascript esta la de usar [objetos literales](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals). Enuerar las propiedades entre llaves

```js
const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
};

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5,
};

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov",
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University",
};
```

- Los valores pueden tomar cualquier tipo: entero, string, array, objeto,...
- Si se quiere accder a las propiedades de un objeto se puede usar la notacion de 'punto' o usar corchetes
- Tambien se pueden modificar o agragar propiedades de la mima manera
- A las propiedades que ocntengan espacios en su definicon se debe aceer mediante corchetes
- Los objtos tabien pueden tener metodos
- Los osbjteos tabmbien se pueden definir mediante las funciones de constructor igual que en Java ==, aunque Javascript no tiene clases como los lenguajes otientados a objetos==. Desde ES6 tiene sintaxis de clase

```js
console.log(object1.name); // se imprime Arto Hellas
const fieldName = "age";
console.log(object1[fieldName]); // se imprime 35

object1.address = "Helsinki";
object1["secret number"] = 12341;
```

### Funciones

- Definicion de [funciones flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

```js
const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};
```

- Llamada a la funcion

```js
const result = sum(1, 5);
console.log(result);
```

- Si hay un solo parametro se pude obmitir los parentesis.
- Si solo contiene una expresion las llaves no son necesarias

```js
const square = (p) => p * p;
```

- Se puede aplicar con el metodo `map` de arrays

```js
const t = [1, 2, 3];
const tSquared = t.map((p) => p * p);
// tSquared ahora es [1, 4, 9]
```

- Antes de ES6 solo se podian definir mediante `function`.
- Se puede hacer mediadnte [declaración de función](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/function)

```js
function product(a, b) {
  return a * b;
}
const result = product(2, 6);
// result ahora es 12
```

- O mediante [expresión de función](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/function)

```js
//Asignandola a una constante
const average = function (a, b) {
  return (a + b) / 2;
};
const result = average(2, 5);
// result ahora es 3.5
```

### Clases

- En sintaxis, clases y objetos en Javscript son similares a los de Java
- Internamientre las lcases son objetos basados en [`herencia prototipica`](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Inheritance)
- Clases y objetos son de tipo `Object`.
- Los unicos tipos e Javascript son : [Boolean, Null, Undefined, Number, String, Symbol, BigInt y Object](https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures)

#### Metodos de objeto y ['this'](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/this)

- Las funciones flecha y las definidasd con `function` se comportan de forma diferente respecto a la palbrra clave `this`
- Se pueden asignar funciones como propiedades a un objeto
- Tambien se lecpueden asignar metodos aun despues de su creacion
- Un metodo que continene un `this`, si es guardado en una referencia, pierde el puntero al `this` referenciado por la funcion original. Los metodos `hola()`y `holaConsola()` continene `this` como referencia ala objeto y apuntando al nombre. Si o utilizdas devuelven el nombre correctamente. Si son referenciadas no eneontrarane l nombre.
- Al llamar al metodo desde una referencia, la aplabra `this` tomara el valor ddel [obbjeto global](https://developer.mozilla.org/es/docs/Glossary/Global_object)
- Existen maneras de conservar el `this`original:
  - [`bind`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). Liga el metodo al `this`del objeto

```js
setTimeout(sujeto.holaConsola, 1000); //"hola, mi nombre es undefined"
setTimeout(sujeto.holaConsola.bind(sujeto), 1000); //"hola, mi nombre es pepe"
```

- Lo mejor es usar `this`lo menos posible
- Con funciones flecha `this` no funciona como apuntador al objeto

```js
const sujeto = {
  nombre: "pepe",
  edad: 100,
  hola: function () {
    return "hola , mi  nombre es  " + this.nombre;
  },
  holaConsola: function () {
    console.log("hola, mi nombre es " + this.nombre);
  },
  suma: function (a, b) {
    console.log(a + b);
  },
};

console.log(sujeto.hola()); //"hola , mi  nombre es  pepe"
//Añadir funcion despues de crear el objeto
sujeto.incEdad = function () {
  this.edad += 1;
};
console.log(sujeto.edad); // 100
sujeto.incEdad();
console.log(sujeto.edad); // 101
const saludo = sujeto.holaConsola; //"hola , mi  nombre es  undefined"
console.log(saludo()); // undefined
const otroSaludo = sujeto.hola;
console.log(otroSaludo()); //"hola , mi  nombre es  undefined"
const misuma = sujeto.suma;
misuma(23, 43); //66
```

### Mas info

> [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript), estandar Javascript
> [ECMAScript® 2023, ES14](https://www.ecma-international.org/ecma-262/), ultima version del estandar
> [Babel](https://babeljs.io/), transpilador.
>
> - Permite entre otras cosas adaptar codogio JAvascript moderno a otro antiguo que pueda ser soportado por navegadores que no soportan aun funcionalidades modernas.
>
> [Node.js](https://nodejs.org/en/), entorno d ejecucion de Javascript basado en [V8](https://developers.google.com/v8/) de Google.
>
> - Funciona en servidores y moviles entre otors dispositivos.
> - Esta actualizado a la ultima version e Javascript.
> - Los archivos javascript `js`se ejecutan mediante el comando `node archivo.js`
> - Desde la consola de Node.js se puede escribir codigo Javascript

### Recursos Javascript

> &#9989; [Guía de JavaScript de Mozilla.](https://developer.mozilla.org/es/docs/Web/JavaScript)  
> &#9989; [Re-introducción a JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/A_re-introduction_to_JavaScript)  
> &#9989; [You-Dont-Know-JS.](https://github.com/getify/You-Dont-Know-JS)  
> &#9989; [javascript.info.](https://es.javascript.info/)  
> &#9989; [Eloquent JavaScript](https://eloquentjavascript.net/)  
> [Namaste 🙏 JavaScript](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP)  
> [egghead.io ](https://egghead.io/)

## c - Estado del componente, controladores de eventos

### Funciones auxiliares del componente

- Podemos añadir funciones auxiliares en el componente. Es auxiliar ya que esta dentro del componetne que es una funcion

```js
const Hola = (props) => {
  const naciste = () => {
    const ahora = new Date().getFullYear();
    return ahora - props.edad;
  };
  return (
    <div>
      <p>
        Hola {props.nombre}, tu tienes {props.edad} años
      </p>

      <p>Problablemente naciste en {naciste()}</p>
    </div>
  );
};
```

### Desestructuración

- Caracteriustica del lenguaje Jvacscript a pàrtir de ES6
- Nos permite descomponer valores en la asignacion a partir de objetos y arrays
- props es un objeto, por tanto podemos optimizar el codigo anterior

```js
props = {
  nombre: "pepe",
  edad: 30,
};
```

```jsx
    const Hola = (props) => {
        const edad = props.edad;
        const nombre = props.nombre;
        const naciste = () =>  new Date().getFullYear() - edad
        }
        return (
            <div>
            <p>
                Hola {nombre}, tu tienes {edad} años
            </p>

            <p>Problablemente naciste en  {naciste()}</p>
            </div>
        )
    }
```

- Tambien se puede obtener las variables de esta manera

```js
const { nombre, edad } = props;
```

- O desestrucutrarlas desde los parametros del componente en vez de pasar el objeto `props`

```jsx
    const Hola = ({nombre, edad}) => {
        ...
    }
```

### Componentes con estado

- Si necesitamos que ele ocmponente se refresque de nuevo porque tiene que mostar inforamcion nueva no necesitamos ahcer el re-renderizado de nuevoSe puedel mismo componente
- Para eso tenemos el [hook de estado](https://es.react.dev/learn/state-a-components-memory) de REact
- Si queremos poner un contador en App.jsx.
  - Importamos la funcion `useState`.
  - Llamamoos a la funcion asingadonla a los valores `counter` y `setCounter`.
  - `counter` tiene el valor de state que es 0.
  - `setCounter` se asigna a una funcion que permite modificar el estado
  - `setTimeout` incrementa el ocntador cada segundo invocando a la funcion `setCounter`
  - Cada vez que `setCounter` modifica el estado se ejecuta el renderizado de l comonente con el nuevo estado.

```jsx
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  setTimeout(() => setCounter(counter + 1), 1000);
  return <div>{counter}</div>;
};
export default App;
```
### Reglas de los Hooks
- Las funcioones que comienzan por `use`son denomiadas `Hooks`enm React: `useState`, `useEffect`, ...
  
- Hay que seguir unas [reglas](https://es.react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks) para que los Hooks fncionene ccorrectamente
- &#9989; Los Hooks se usan en el nivel superior de un  componente de funcion o de un [`hook personaliado`](https://es.react.dev/learn/reusing-logic-with-custom-hooks) 
- &#9940; No se permiten :
  - dentro de condicionales o bucles
  - Despues de una delcaracionm de return condicional
  - En controladores de eventos
  - En componentes de clase
  - Dentro de funciones pasadas a `useMemo`, `useReducer` o `useEffect` 
### Control de eventos

- Necesitamos añadir un [boton](<[botón](https://developer.mozilla.org/es/docs/Web/HTML/Element/button)>) para que el usuario pueda aumentar el contador
- El boton admite los [`eventos de raton`](https://developer.mozilla.org/es/docs/Web/API/MouseEvent) como el [`click`](https://developer.mozilla.org/es/docs/Web/Events/click)
- Hay que registr la funcion de [controlador de eventos](https://es.react.dev/learn/responding-to-events). En React se hace asi:
- Creamos dos funciones flecha para incremtneara y poner a 0 el contador.
- LAs asignamos aa unas variables
- Ponemos entre llavews estas variables en el evento `onClick`de cada boton.
- Se podria poner estas funciones directamente en el evncto del botron pero no es recomendable

```js
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
};
```

### Pasando el estado a componentes hijos

- Recomendable hacer componentes pequeños y reutilizables
- REfactorizaomos y creamos componentes mas pequeños para el contador y para los botones

`Display.jsx`

```jsx
const Display = (props) => {
  return <div>{props.counter}</div>;
};
```

`Button.jsx`

```jsx
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
```

- Los declaramos en `App.jsx`y añadimos ua funcon para decermentar el contador
- Una buena practica de REact es [levantar el estado](https://es.react.dev/learn/sharing-state-between-components):-
  - Si varios componentes eben relfejar los mismos datos cambiantes, el evar el estado al padre comun mas cercano
  - Por eso dejamos el estado en `App`y lo pasamos a `Display` a tracve de `props`

`App.jsx`

```jsx
const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);

  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />

      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  );
};
```

- Cuando se hace click en los botones y cambia el estado, `App`se veulee a renderizar incluidos todos los elementos hjjos
- Es una convencion de React usar nombre `onSomething`para props que representan eventos y `handleSomething`par adefinicne de funcions que ontrolan los eventos

### Refactorización de los componentes

- Podemos desetructurar el componente Display

```jsx
const Display = ({ counter }) => <div>{counter}</div>;
```

```jsx
const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>;
```

## d - Un estado más complejo, depurando aplicaciones React

### Como representar estados complejos

- Si requerimos un estado mas complejo que guarde mas de una variable:
- `left, right`
- usar la funcion useState varias veces con partes de estado separadas

```jsx
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
        return (
            <div>
                {left}
                <button onClick={() => setLeft(left + 1)}>
                    left
                </button>
                <button onClick={() => setRight(right + 1)}>
                    right
                </button>
                {right}
            </div>
        )
    }
```

- Tambien se puede guardar ele estado en un solo objeto. USaos la sintaxis [spread](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- `{ ...clicks, right: clicks.right + 1 }`crea un nuevo objeto donde la propiedad right aumenta en 1.

```jsx
const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 });

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  );
};
```

- Si hacemos esto:

```jsx
const handleLeftClick = () => {
  clicks.left++;
  setClicks(clicks);
};
```

- Podrian surgir [efectos inesperados](https://stackoverflow.com/a/40309023)
- En esta aplicacion es msa recomendable separar los estado.

#### Como estrucuturar el estado?

- Seguir esta [guia](https://es.react.dev/learn/choosing-the-state-structure) REPASAR &#10071;
  - Si se actuazaliazan dos o mas variablkes fusionaarlas en una sola: variables {x,y} de posicion en la pantalla. Tambien si se desconoecen cuantas varaibles haran falta: formualrio personlizable por el usuario
  - Evitar contradicciones: se pueden eliminar dos estados que hacen algo similar ycambiarlas por una variable de estado
  - Evitar estado redundante: `firstname`, `lastname`, `fullname` -> redundante, se puede calcular con las dos anteriores
  - Tampoco pasar props al estado. Despues no se actuzalizara
  - Evitar ducplicacion de estado: si tenemos una lista de items y una varaible pra seleccionar un item, usar solo un camo id y no todo el objeto item
  - Evitar aniodacion de estados: continenetes, paises, ciudades. Hacerlo como una base dedatos, guardar un arrray de ids de hijos

### Manejo de arrays

- Agregamos un array al estado `allClicks`con los clicks que se han chehop en la aplicaicon
- Tenemos todas las variables separadas. left, right cada una con su boton. Si se hace left, en allClicks se añade L, con right R. Se usa el metodo ` concat`que crea un array nuevo
- No hacer `allClicks.push` , modificaria el estado directamente &#128122; <span style="color:red">MAL</span>. Hay que hacerlo con las funciones de cambio de estado`setAll` `setLeft` `setRight`

```jsx
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const leftPlus = left + 1;
    setLeft(leftPlus);
    setTotal(leftPlus + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const rightPlus = right + 1;
    setRight(rightPlus);
    setTotal(left + rightPlus);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(" ")}</p>
      <p>total {total}</p>
    </div>
  );
};
```

### La actualización del estado es [asíncrona](https://es.react.dev/learn/queueing-a-series-of-state-updates)
- LAs actuaclizaciones e estado ocurren no imedaitemente sino een algun moemnto antes de que el componente se renderizce de nuevo
- Por esta razon guardamos en una variable el incremento y despues le pasamos esa variable a la funione de esado setRight y setLeft
- Sino daria resultado inesperados y  el totral no se actuzliaria corremtamente
```jsx
    const rightPlus = right + 1;
    setRight(rightPlus);
    setTotal(left + rightPlus);
```

### Renderizado condicional
- Creamos un componente `History` poara manejar el renderizado del historial de clicks
- Ese componente contiene una condicion: si el array `allClicks` esta vacio se muestra un mensaje: `the app is used by pressing the buttons`. En losdemas casos se muestra un testo con el array `allClicks` en forma de string
- Este es uno de los ejemlos de [renedrizado conciional](https://es.react.dev/learn/conditional-rendering) que se puede hacer con React
```jsx
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const App = () => {
  // ...
  return (
    <div>
      {left}
    <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
```
### React Antiguo
- Antes de la version [6.8.0](https://www.npmjs.com/package/react/v/16.8.0) de REact, los componentes que reqerian estado se tenian que definir como compoentes de clase. 
- La sintaxis de clase se esta dejando de lado por los componentes funcioneales
- Pero aun hay codigo antiguo con la sintaxis antigua &#10071;
### Depuración de aplicaciones React
- Siempre usar `consolelog('texto ', variables')`
- Mostra en consola del navegador <kbd>⌥ ⌘ i</kbd>
- Mostrar los pasos de props
- Meter el comando [`debugger`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/debugger)
- La aplicacion se deteinen donde se encuentra el comando 
- Instalar extension [REact Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [REact Deveoper tools desde shell](https://es.react.dev/learn/react-developer-tools)

### Repaso de los Controladores de Eventos
- Si queremos gstionar un evneto a traves de un boton tenemmos que hacer una funcion para controlar la accion que se realiza dado el evento
- Esta funcion es el manejadr de eventos
- Siempre debe ser una funcion o referencia a una funcion 
- No sirve con poner el cidigo en el onClick del button
- Una opcion es:
```jsx
    const handleZeroClick = () => {
        console.log("clicked the button");
        setAll([]);
        setRight(0)
        setLeft(0)
    };  
```
```jsx
    <Button handleClick={handleZeroClick} text="todo a zero" />
```

### Funciónes que devuelven   funciónes ? &#128125;

### Pasando controladores de eventos a componentes hijos


### LEER
- https://fullstackopen.com/en/part0/general_info#how-to-get-help-in-%20discord-telegram
### Utilización de grandes modelos de lenguaje (LLM)


