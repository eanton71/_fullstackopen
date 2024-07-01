import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  /**
   * Manejadores
   */
 
  const handle = {
    good: () => {
      const goodPlus = good + 1;
      console.log("good", goodPlus);
      setGood(goodPlus);
    },
    neutral: () => {
      const neutralPlus = neutral + 1;
      console.log("neutral", neutralPlus);
      setNeutral(neutralPlus);
    },
    bad: () => {
      const badPlus = bad + 1;
      console.log("bad", badPlus);
      setBad(badPlus);
    },
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handle["good"]} text="good" />
      <Button handleClick={handle["neutral"]} text="neutral" />
      <Button handleClick={handle["bad"]} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
 