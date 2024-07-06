import Person from "./Person";
const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.id} person={person} />
        ))}
    </>
  );
};
export default Persons;
