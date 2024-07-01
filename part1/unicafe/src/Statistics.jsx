import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = () => bad + neutral + good;
  //Guardamos ell puntaje dado a cada puntuacion por si la queros cambiar
  const score = {
    good: 1,
    neutral: 0,
    bad: -1,
  };
  /**
   * CAlcula el promedio a parti de  la cantida de votos buenos malos y neutrales
   * @returns promedio segun puntaje
   */
  const average = () => {
    if (total() === 0) return 0;
    return (
      (good * score.good + neutral * score.neutral + bad * score.bad) / total()
    );
  };

  const goodPercentage = () => {
    if (total() === 0) return 0;
    return (good / total()) * 100;
  };
  //Si no hay estadisticas se muestra este mensaje 
  if (!total()) return <p>No feedback given</p>
  //hay estadisticas las mostramos
  return (
    <table>
      <tbody>
        
        <StatisticLine text="god" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all:" value={total()} />
        <StatisticLine text="average:" value={average()} />
        <StatisticLine text="positive:" value={goodPercentage() + " %"} />
      </tbody>
    </table>
  );
};
export default Statistics;
