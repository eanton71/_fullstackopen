const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <h2>{countries[0].name}</h2>;
  } else {
    return countries.map((country) => (
      <div key="country.name">{country.name}</div>
    ));
  }
};
export default Countries;
