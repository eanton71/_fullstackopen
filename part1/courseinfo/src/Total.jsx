/**
 * Total
 * @param {*} props = sum (parts[0].exercices+ parts[1].exercices+ parts[2].exercices)
 * @returns
 */
const Total = (props) => {
  console.log("Total: ", props);
  return (
    <p>
     Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises} 
    </p>
  );
};
export default Total;