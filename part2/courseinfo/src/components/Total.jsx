

const Total = ({ parts }) => (
     
    
    <strong>
        total of {parts.reduce(
      (acc, current) => acc + current.exercises,
      0
    )} exercices
    </strong>
)

export default Total;