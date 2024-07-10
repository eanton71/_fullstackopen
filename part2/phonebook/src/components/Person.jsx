const Person = ({ person, deletePerson }) => {
  console.log(person.id);
  return (
    <p>
      {person.name} {person.number}{" "}
      <button type="submit" onClick={deletePerson}>
        delete
      </button>
    </p>
  );
};
export default Person;