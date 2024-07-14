import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";
import "./App.css";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import InfoCountry from "./components/InfoCountry";
import InfoWeather from "./components/InfoWeather";
//import Notification from "./components/Notification";
//const DELAY = 2000;
function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [infoCountry, setInfoCountry] = useState(null);
  const [infoWeather, setInfoWeather] = useState(null);
  //const [errorMessage, setErrorMessage] = useState("");
 // const [message, setMessage] = useState("");

/*   
  const notifyTimeout = {
    error: (delay, error) => {
      setErrorMessage(` '${error}'`);
      setTimeout(() => {
        setErrorMessage(null);
      }, delay);
    },
    sucess: (delay, sucess) => {
      setMessage(sucess);
      setTimeout(() => {
        setMessage(null);
      }, delay);
    },
  }; 
  */
  const handleChange = (event) => {
    setFilter(event.target.value);
    setInfoCountry(null);
  };
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClick = (country) => {
    setInfoCountry(country);
  };
  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => {
        setCountries(
          initialCountries.map((c) => ({
            id: self.crypto.randomUUID(),
            name: c.name.common,
            capital: c.capital,
            area: c.area,
            languages: c.languages,
            flag: c.flags.png,
            lat: c.latlng[0],
            lon: c.latlng[1],
          }))
        );
      })
      .catch((error) => console.error(error));
  }, []);

  /**
   *
   */
  useEffect(() => {
    if (infoCountry) {
      weatherService
        .getCityWeather(infoCountry.capital.join())
        .then((weather) => {
          setInfoWeather({
            temp: weather.main.temp,
            wind: weather.wind.speed,
            icon: weather.weather[0].icon,
          });
        })
        .catch((error) => console.error(error));
    } else {
      console.log('wait');
    }
  }, [infoCountry]);

  return (
    <>
      <h1>Countries</h1>
      {/* <Notification sucess={message} error={errorMessage} /> */}
      <Filter label={"find countries "} value={filter} handle={handleChange} />
      <Countries countries={filtered} handleClick={handleClick} />
      {infoCountry != null ? (
        <InfoCountry
          capital={infoCountry.capital}
          area={infoCountry.area}
          languages={Object.values(infoCountry.languages)}
          flag={infoCountry.flag}
        />
      ) : (
        <br />
      )}
      {infoWeather != null && infoCountry != null ? (
        <InfoWeather
          capital={infoCountry.capital}
          temp={infoWeather.temp}
          wind={infoWeather.wind}
          icon={infoWeather.icon}
        />
      ) : (
        <br />
      )}
    </>
  );
}

export default App;
