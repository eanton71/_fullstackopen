# Parte 2 Comunicándose con el servidor

## a Colecciones dinamicas. Modulos

### Fragmentos de codigo en Visual Studio

- [`snippets`](https://code.visualstudio.com/docs/editor/userdefinedsnippets): trozos de codigo reutilizavbbles   
- hay para diferente slenguajes
- se generarna a partir de 
- se pueden instalr desde [Marketplace](https://marketplace.visualstudio.com/vscode)
- 
### Programacion funcional con arrays
- [Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- funciones:
  - [find](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find). busca un elemento que cumpla una condicion dada en una funcioon callback
    - `elem = arr.find(callbackFn)`
    -  `elem = arr.find(callbackFn, thisArg)`
  - [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). crea una copia sueprficial de una parte de un array cumpiendo las condiciones dadas por callback
    - `arrFilter = arr.filter(callbackFn)` `...thisArg)`
  - [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) Crea un nuevo array tansformando cada aelemento a partir del array existente
      - `newArr = arr.map(callbackFn)` `...thisArg)`
  - [reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
    - `sumWithInitial = array1.reduce((accumulator, currentValue) => accumulator + currentValue,  initialValue,)` 
- [Programación funcional en JavaScript](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
### Renderizar colecciones (arrays de objetos indexados)
- La funcion `map`de Javascript nos permite renderizar colecciones y arrays de forma sencilla modicficando cada elemento y dandole el formato que queramos
- Si tenemos esta aplicacion:   
`Main.jsx`
```jsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'

    import App from './App'

    const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
    ]

    ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />
    )
```
`App.jsx`
```jsx
    const App = (props) => {
    const { notes } = props

    return (
        <div>
        <h1>Notes</h1>
        <ul>
            <li>{notes[0].content}</li>
            <li>{notes[1].content}</li>
            <li>{notes[2].content}</li>
        </ul>
        </div>
    )
    }
    export default App
```
- Se puede mostrar dinammicacmente la lista de notas mediante `map`
  - `notes.map(note => <li>{note.content}</li>)`, que mostrara en el navegador: 
```html
    <li>HTML is easy</li>,
    <li>Browser can execute only JavaScript</li>,
    <li>GET and POST are the most important methods of HTTP protocol</li>,
```
- La funcion `map`es en javascript por lo que habra que ponerla entre llaves y la etiqueta `<ul>`que engloba una lista:
- `<ul>{notes.map(note => <li>{note.content}</li>)}</ul>`
- Por cada elemento `note` se crea un elemento de lista con el atributo `note.content`
#### Es necesario (y muy recomendable) incluir un atributo `key`para las colecciones
- Tenemos un warning que se nos muestra por consola:
```bash
Warning: Each child in a list should have a unique "key" prop.

Check the render method of `App`. See https://reactjs.org/link/warning-keys for more information.
    at li
    at App (http://localhost:5173/src/App.jsx?t=1720012547714:18:11)
```
- Se necesita incluir una clave unica para cada elemento, la coleccion notes y continene una propiedad id que nos viene muy bien
```jsx
      <ul>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
```
- Este atributo nos permite identiicar no solo elementos de colecciones. Tambien diferenciar componentes o formularios
- MAs info sobre [`key`  en REact](https://es.react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)
  
#### &#128122; <span style="color:red">   Antipatron </span> Indice del array como key

- `notes.map((note, i) => ...)`, i recoge el indice del array y se podria colocar een el atributo `key` pero podria generar resultados imprevisibles. Mejor generar un id especifico
- Leer : [esto](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
### Refactorizar modulos
- Creamos un modulo para las notas
- Ponemos los atributos especiificosde las props entre llaves para accdere a ellos
- Ahora la ksy se añade a cada elemento `Note` y no al elemento `li`
- Mejor si popnemos el comopnete Note en un archivo aparte , lo pondremos en una carpeta `src/components`
```jsx
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}
export default Note
....
import Note from "./components/Note";

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>

        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
```
## b Formularios


## c Obteniedo datos del servidor

## d Alterando datos en el servidor

## e Estilos en React