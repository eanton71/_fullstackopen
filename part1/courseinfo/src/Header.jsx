/**
 * componente Header
 * @param {*} props = course
 * @returns
 */
const Header = (props) => {
  console.log("Header: ", props);
  return <h1>{props.course.name}</h1>;
};

export default Header;