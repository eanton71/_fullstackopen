const InfoCountry = ({ capital, area, languages, flag }) => {
  return (
    <div className="info-country">
      <strong>Capital: </strong>
      {capital.join(" ")}
      <br />
      <strong>Area: </strong> {area}
      <br />
      <strong>Languages: </strong>
      {languages.join(" ")}
      <br />
      <img src={flag} alt="flag" className="flag" />
    </div>
  );
};
export default InfoCountry;
