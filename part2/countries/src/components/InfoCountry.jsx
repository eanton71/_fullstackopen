const InfoCountry = ({ capital, area, languages, flag }) => {
   // console.log(capital, area, languages, flag);
  return (
    <div className="info-country">
      <strong>Capital: </strong>
      {capital.join(" ")}
      <br />
      <strong>Area: </strong> {area}
      <br />
      <strong>Languages: </strong>
      <ul>
        {languages.map((lang) => (
          <li key='lang'>{lang}</li>
        ))}
      </ul>
      <br />
      <img src={flag} alt="flag" className="flag" />
    </div>
  );
};
export default InfoCountry;
