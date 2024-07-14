

const Countries = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }else {
    return countries.map((country) => (
      <div key="country.id">
        {country.name}

        <button type="submit" onClick={() => handleClick(country)}>
          show
        </button>
      </div>
    ));
  }
};
export default Countries;
