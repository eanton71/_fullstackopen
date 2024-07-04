import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
    return (
      <>
        {/* Titulo */}
        <Header title={course.name} />
        {/* Coleccion parts dentro de course */}
        <Content parts={course.parts} />
      </>
    );
};

export default Course;
