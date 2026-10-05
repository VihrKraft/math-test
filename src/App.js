import { useState } from 'react';
import './App.css';
import { Autorisation } from './components/Autorization.jsx';
import { createClient } from '@supabase/supabase-js';
import { Game } from './components/Game.jsx';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

function App() {

  // ФОрмулировака как для програмиста, 10-20 задач, 2 варианта
  const[correct, setCorrect] = useState(0)

  const[step, setStep] = useState(0)

  const[name, setName] = useState('');

  const[surname, setSurname] = useState('')

  const[group, setGroup] = useState('')

  const[isAuthorized, setIsAuthorized] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: searchData, error: searchError } = await supabase
        .from('users_results')
        .select('*')
        .match({'surname': surname, 'name': name, 'group': group})

      if (searchError) throw searchError;

      if (searchData.length !== 0) {
        setIsAuthorized(true);
      } else {
        const { data: inpData, error: inpError } = await supabase
          .from('users_results')
          .insert([
            { 
              'name': name,
              'surname': surname,
              'group': group,
              'percent': 0
            }
          ])
          .select();

        if (inpError) throw inpError;

        if (inpData && inpData.length > 0) {
          setIsAuthorized(true);
        }
      }
      
    } catch (err) {
      console.error("Supabase Error:", err);
      alert('Не удалось войти');
    }
  };

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
      {isAuthorized ?
        <Game questions={questions} question={question} onClickVariant={onClickVariant} step={step} setStep={setStep} correct={correct}/>
      :
        <Autorisation setGroup={setGroup} setName={setName} setSurname={setSurname} handleSubmit={handleSubmit} />
      }
    </div>
    
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default App;
