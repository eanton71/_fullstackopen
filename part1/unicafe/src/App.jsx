import { useState } from "react";
import Button from "./Button";
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  /**
   * Manejadores
   */
  const handleGoodClick = () => {
    const goodPlus = good + 1;
    console.log("good", goodPlus);
    setGood(goodPlus);
  };
  const handleNeutralClick = () => {
    const neutralPlus = neutral + 1;
    console.log("neutral", neutralPlus);
    setNeutral(neutralPlus);
  };
  const handleBadClick = () => {
    const badPlus = bad + 1;
    console.log("bad", badPlus);
    setBad(badPlus);
  };
  const total = () => bad + neutral + good;
  const score = {
    good: 1,
    neutral: 0,
    bad: -1,
  };
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
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total()}</p>
      <p>average: {average()}</p>
      <p>positive:{goodPercentage() } % </p>
    </div>
  );
};

export default App;
