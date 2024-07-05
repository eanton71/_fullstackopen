import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" ,id:1}]);
  const [newName, setNewName] = useState("");
  /**
   * añadir persona al array persons
   * @param {*} event 
   */
  const addPerson = (event) => {
    event.preventDefault();
    //buscamos el nombre que esta en el input dentro del array persons para evitar ducplicados
    //si esta mostramos un alert
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      //si no esta lo añadimos
      const personObject = {
        name: newName,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/*formulario con el input para añadir peronas */}
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*renderizar  array persons mediante map */}
      {persons.map((person) => (
        <p key={person.id}>
           {person.name}
        </p>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
