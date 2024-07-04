

const Total = ({ parts }) => (
  <strong>
    {/* CAlculamos la suma con reduce, se toma solo el campo exercices : current.exercices 
    inicial = 0 en acc se guarda la suma acumulada*/}
    total of {parts.reduce((acc, current) => acc + current.exercises, 0)}{" "}
    exercices
  </strong>
);

export default Total;