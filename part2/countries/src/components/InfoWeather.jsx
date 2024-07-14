const InfoWeather = ({ capital, temp, wind, icon }) => {
  
  const src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="info-weather">
      <h3>Weather in {capital}</h3>
      <p>temperature {temp} Celsius</p>

          <img src={src} alt={icon} />
          <p>wind {wind} m/s</p>
    </div>
  );
};
export default InfoWeather;
