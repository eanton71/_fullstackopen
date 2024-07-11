import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import { useState, useEffect } from "react";
import personService from "./services/persons";

const DELAY = 5000;

const App = () => {
  //estado con array de personas
  const [persons, setPersons] = useState([]);
  //estado para input name en formulario
  const [newName, setNewName] = useState("");
  //estado para input number en formulario
  const [newNumber, setNewNumber] = useState("");
  //estado para input de busqueda
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessMessage, setSucessMessage] = useState(null);
  /**
   * llamada al servicio que se encarga de
   * comunicarse con la base dedatos
   * getAll: obtenemos toda la lista de peronsa
   * setPErsons: actuzalizar estado y  render app
   */
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => console.log(`${error}`));
  }, []);

  //notifyTimeout.sucess(5000, "render", persons.length, "persons");

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
      if (window.confirm(`${newName} is in phonebook`)) {
        personService
          .update(personExists.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== personExists.id ? p : returnedPerson
              )
            );
            notifyTimeout.sucess(
              DELAY,
              `Update phone number from ${personExists.name}`
            );
          })
          .catch((error) => {
            notifyTimeout.error(DELAY, `User:  ${error} not exists`);
            setPersons(persons.filter((p) => p.id !== personExists.id));
          });
      }
    } else {
      //si no esta lo añadimos, no meter id
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          notifyTimeout.sucess(DELAY, `Added person:  ${personObject.name}`);
        })
        .catch((error) =>
          notifyTimeout.error(
            `${error} Not added person:  ${personObject.name}`
          )
        );
    }
    setNewName("");
    setNewNumber("");
  };
  /**
   * eliminar persona de la lista de telefonos
   * @param {*} id de la persona
   */
  const deletePerson = (id) => {
    //buscar la persona por el id
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`${person.name} deleted`)) {
      personService
        .erase(person.id)
        .then((retPerson) => {
          notifyTimeout.sucess(DELAY, `User: ${retPerson.name} deleted`);
        })
        .catch((error) => {
          notifyTimeout.error(DELAY, ` ${error}`);
          setPersons(persons.filter((p) => p.id !== id));
        });
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

  /**
   * Gestion de los menaajes de notificacion para error o exito
   */
  const notifyTimeout = {
    error: (delay, error) => {
      setErrorMessage(` '${error}'`);
      setTimeout(() => {
        setErrorMessage(null);
      }, delay);
    },
    sucess: (delay, sucess) => {
      setSucessMessage(sucess);
      setTimeout(() => {
        setSucessMessage(null);
      }, delay);
    },
  };
  /**
   * Renderizado  de App
   */
  return (
    <div>
      <h1>Phonebook</h1>      
      <Notification sucess={sucessMessage} error={errorMessage} />
      <Filter
        label={"filter shown with "}
        value={filter}
        handle={handleChange["filter"]}
      />
      <h2>Add a new</h2>
      {/*formulario con el input para añadir personas */}
      <PersonForm
        add={addPerson}
        val1={newName}
        handle1={handleChange["name"]}
        val2={newNumber}
        handle2={handleChange["number"]}
      />
      <h2>Numbers</h2>
      {/*Lista renderizada de personas*/}
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
