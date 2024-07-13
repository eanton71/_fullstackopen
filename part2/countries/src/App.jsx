import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import "./App.css";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import InfoCountry from "./components/InfoCountry";
function App() {
  const [countries, setCountries] = useState([]); 
  const [filter, setFilter] = useState("");
  const [info, setInfo] = useState(null);

  const handleChange = (event) => {
    setFilter(event.target.value); 
    setInfo(null)
  };
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );
 
  const handleClick = (country) => {
    setInfo(country);
  };
 
  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(
        initialCountries.map((c) => ({
          name: c.name.common,
          capital: c.capital,
          area: c.area,
          languages: c.languages,
          flag: c.flags.png,
        }))
      );
    });
  }, []);

  return (
    <>
      <h1>Countries</h1>
      <Filter label={"find countries "} value={filter} handle={handleChange} />
      <Countries countries={filtered} handleClick={handleClick} />
      {info != null   ? (
        <InfoCountry
          capital={info.capital}
          area={info.area}
          languages={Object.values(info.languages)}
          flag={info.flag}
        />
      ) : (
        <br />
      )}
    </>
  );
}

export default App;
