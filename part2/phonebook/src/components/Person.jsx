const Person = ({ person, deletePerson }) => {
  console.log(person.id);
  return (
    <li>
      {person.name} {person.number}{" "}
      <button type="submit" onClick={deletePerson}>
        delete
      </button>
    </li>
  );
};
export default Person;