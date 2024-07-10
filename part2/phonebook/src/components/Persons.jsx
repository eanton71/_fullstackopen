import Person from "./Person"; 
const Persons = ({ persons, filter, deletePerson }) => {

  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </>
  );
};
export default Persons;
