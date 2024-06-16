/**
 * Part
 * @param {*} props = {part : parts[].name , exercice: parts[].exercice
 * @returns
 */
const Part = (props) => {
  console.log("Part: ", props);
  return (
    <p>
      {" "}
      {props.part} {props.exercises}{" "}
    </p>
  );
};
export default Part;