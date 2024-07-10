import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  //estado con array de personas
  const [persons, setPersons] = useState([]);
  //estado para input name en formulario
  const [newName, setNewName] = useState("");
  //estado para input number en formulario
  const [newNumber, setNewNumber] = useState("");
  //estado para input de busqueda
  const [filter, setFilter] = useState("");

  /**
   * llamada al servicio que se encarga de
   * comunicarse con la base dedatos
   * getAll: obtenemos toda la lista de peronsa
   * setPErsons: actuzalizar estado y  render app
   */
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  /**
   * añadir persona al array persons
   * @param {*} event
   */
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    //buscamos el nombre que esta en el input dentro del array persons para evitar ducplicados
    //si esta lo actualizamos
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      // alert(`${newName} is already added to phonebook`);
      if (window.confirm(`${newName} is in phonebook`)) {
        personService
          .update(personExists.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== personExists.id ? p : returnedPerson
              )
            );
          })
          .catch((error) => {
            alert(
              `Information of ${personExists.name} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== personExists.id));
          });
      }
    } else {
      //si no esta lo añadimos, no meter id
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`${person.name} deleted`)) {
      personService
        .erase(person.id)
        .then((retPerson) => {
          console.log(`${retPerson.name} deleted`);
        })
        .catch((error) => alert(`Error: ${error.response.data.error}`));
      setPersons(persons.filter((p) => p.id !== id));
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
  };

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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
