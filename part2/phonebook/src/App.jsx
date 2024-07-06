import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useState } from "react";

const App = () => {
  //estado con array de personas
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  //estado para input name en formulario
  const [newName, setNewName] = useState("");
  //estado para input number en formulario
  const [newNumber, setNewNumber] = useState("");
  //estado para input de busqueda
  const [filter, setFilter] = useState("");

  /**
   * añadir persona al array persons
   * @param {*} event
   */
  const addPerson = (event) => {
    event.preventDefault();
    //buscamos el nombre que esta en el input dentro del array persons para evitar ducplicados
    //si esta mostramos un alert
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      //si no esta lo añadimos
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };
  /***
   * manejadores de eventos asociados al estado de los inputs
   */
  const handleChange = {
    name: (event) => {
      setNewName(event.target.value);      
    },
    number: (event) => {
      setNewNumber(event.target.value);
    },
    filter: (event) => {
      setFilter(event.target.value);
      },
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        label={"filter shown with "}
        value={filter}
        handle={handleChange["filter"]}
      />
      <h2>Add a new</h2>
      {/*formulario con el input para añadir peronas */}
      <PersonForm
        add={addPerson}
        val1={newName}
        handle1={handleChange["name"]}
        val2={newNumber}
        handle2={handleChange["number"]}
      />
      <h2>Numbers</h2>
      {/*renderizar  array persons mediante map , prevismante hace un filtrado
      para que solo muestre los que coinciden con el input asociado al estado filter*/}
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
