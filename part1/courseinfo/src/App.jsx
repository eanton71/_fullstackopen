
/**
 * componente Header 
 * @param {*} props = course
 * @returns 
 */
const Header = (props) => {
  console.log("Header: ", props);
  return <h1>{props.course}</h1>;
};
/**
 * Part 
 * @param {*} props = {part : parts[].name , exercice: parts[].exercice
 * @returns 
 */
const Part = (props) => {
  console.log("Part: ", props);
  return <p>  {props.part} {props.exercises} </p>;
};
/**
 * Content
 * @param {*} props = parts =[{name,exercice}, {},{}]
 * @returns 
 */
const Content = (props) => {
  console.log("Content: ", props);
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />       
    </div>
  );
};
/**
 * Total
 * @param {*} props = sum (parts[0].exercices+ parts[1].exercices+ parts[2].exercices)
 * @returns 
 */
const Total = (props) => {
    console.log("Total: ", props.parts[0]);
  return (
    <p>
      Number of exercises  {
        props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises
      }
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];


  return (
    <div>
      <Header course={course} />
      <Content parts={parts}  />
      <Total parts={parts} />
    </div>
  );
};

export default App;
