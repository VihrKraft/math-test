import { useState } from 'react';
import './App.css';
import { Autorisation } from './components/Autorisation';
import { createClient } from '@supabase/supabase-js';


function App() {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Проверьте переменные окружения Supabase!");
  }

  // ФОрмулировака как для програмиста, 10-20 задач, 2 варианта
  const[correct, setCorrect] = useState(0)

  const[step, setStep] = useState(0)

  const[surname, setSurname] = useState('');

  const[group, setGroup] = useState('');

  const changeGroup = (value) =>
  {
    setGroup(value)
  }

  const changeSurname = (value) =>
  {
    setSurname(value)
  }

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
      <Autorisation questions={questions} question={question} onClickVariant={onClickVariant} step={step} setStep={setStep} correct={correct} changeGroup={changeGroup} changeSurname={changeSurname}/>
    </div>
    
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default App;
