import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import "./App.css";
import Filter from "./components/Filter";
import Countries from "./components/Countries"; 
import InfoCountry from "./components/InfoCountry";
function App() {
  const [countries, setCountries] = useState([]);
  const [countriesShow, setCountriesShow] = useState([])
  const [filter, setFilter] = useState(""); 

  const handleChange = (event) => {
    setFilter(event.target.value); 
    const filtered = countries.filter((c) =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );
    setCountriesShow(filtered);
    console.log(countriesShow)
  };
  /*
  const getCountry = (name) => {
    countriesService
      .get(name)
      .then((initCountry) => {
        setCountry({
          capital: initCountry.capital,
          area: initCountry.area,
          languages: initCountry.languages,
          flag: initCountry.flags.png,
        });
      })
      .catch((error) => console.log(error));
  };
*/
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
      <Countries countries={countriesShow} />
      {countriesShow.length == 1 ? (
        <InfoCountry
          capital={countriesShow[0].capital}
          area={countriesShow[0].area}
          languages={Object.values(countriesShow[0].languages)}
          flag={countriesShow[0].flag}
        />
      ) : (
        <br />
      )}
    </>
  );
}

export default App;
