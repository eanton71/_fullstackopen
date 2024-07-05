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
### Guardar notas en  le estado del componente
- En la aplicacione de notas, si queremos añadir nuevas notas las podemos almacenar eln el estado
- Inicializamos el array notes con el array que se encuentra en Main.jsx
- TAmbien se podria empezar con una lista vacia `useState([])` y omitir el paramtro `props`
- 
```jsx
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

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
export default App 
```
- Añadimos un formulario con un input para añadir nuevas notas
- Tambien una funcion asociada la formaulario
```jsx
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
```
- Por ahora la funcion `addNote`  solo muestra el lemento por consola `console.log('button clicked', event.target)`  que recibe el evento `event`que entra por parametro
### [Componentes controlados](https://es.react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) 
- React necesita tener el valor en todo momento del input debido a los dirferentes renderizados que se pueden hacer 
- La forma d hacerlo es crear un estado para el input , en este caso  un string `newNote`
```jsx
    ...
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState(
      'a new note...'
    )
    ... 
```
- Y tenemos que añadirlo como prop en el atributo value del input
```jsx
     <form onSubmit={addNote}>
        <input value={newNote} />
        <button type="submit">save</button>
      </form>   
```
- Pero tambien tenemos que añadirle un manejador que actualize el estado newNote cada vez que cambie el contenido del input
```jsx
    ...
    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }
    ...
    (...
    <input
      value={newNote}
      onChange={handleNoteChange}
    />
    ...)
```
- Para que se termine qde guardar la nota debemos completar la funcion addNote
- Se crea un objeto con el campo e texto del input, un campo importatnt aleatorio por ahora y un id incrementado
- El objeto se concatena al array notes mediante la funcion de estado `setNotes` 
- `concat` crea un nueva copia del array con el elemento nuevo   BIEN , yaque el estado no dsedebe mutrtrar directamente
- Pone a "" el input con `setNewNote`
```jsx
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: notes.length + 1,
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}
```
### Filtrar loque se quiere mostrar
- Qeremos filtrar segun el atributo importatnt que es booleano. Añadimos un estado booleano
```jsx
const [showAll, setShowAll] = useState(true)
```
- Y cambiamos el array que se mostrara en el map segun si el estado `showAll` es true o false
- Esto es un condicional: en `notesToShow` se guardara dependiendo de la condicion `showAll`. Si es true sera igual a notes, si es false ser hara un filtrado por las notas importantes (metodo filter de Array) 
- El operador `===`se asegura de que la compracion se haga de forma [estricta](https://developer.mozilla.org/es/docs/Web/JavaScript/Equality_comparisons_and_sameness)
```jsx
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
```
- TEnemos que ñadir un boton que permita cambiar el estado `showAll` al usuario
- Ya contien un manejador dentro del evento OnClick. Es una funcion simple que cambia de `showAll` de true a false y viceversa
- Dentro del boton se mostrar el texto important si la condicion `showAll` es true o all si es false
```jsx
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      ...
```
## c Obteniedo datos del servidor

## d Alterando datos en el servidor

## e Estilos en React