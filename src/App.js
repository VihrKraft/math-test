import { useState } from 'react';
import './App.css';
import Game from './Game'


function App() {
  const[correct, setCorrect] = useState(0)

  const[step, setStep] = useState(0)

  const questions = [
    {
        title: 'Функция задана формулой y=x. Определите y при x=5',
        variants: ['4', '5', '6'],
        correct: 1,
    },
    {
        title: 'Функция задана формулой y=3x. Определите y при x=3',
        variants: ['8', '9', '10'],
        correct: 1,
    },
  ];

  const question = questions[step];

  function onClickVariant(index) {
    if (index === questions[step]['correct']) {
      setCorrect(correct+1)
    }
    setStep(step+1)
  }

  return (
    <div className="App">
      <Game questions={questions} question={question} onClickVariant={onClickVariant} step={step} setStep={setStep} correct={correct}/>
    </div>
    
  );
}

export default App;
