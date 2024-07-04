import Part from "./Part";
import Total from "./Total";
const Content = ({ parts }) => (
  <>
    {/* Renderizamos la coleccion parts */}
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    {/* Calculo del total de exercices */}
    <Total parts={parts} />
  </>
);
export default Content;
