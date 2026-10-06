import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import './App.css';
import { Autorisation } from './components/Autorization.jsx';
import { Game } from './components/Game.jsx';
import { Result } from './components/Result.jsx'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {

  // ФОрмулировака как для програмиста, 10-20 задач, 2 варианта
  const[attempt, setAttempt] = useState(false);

  const[correct, setCorrect] = useState(0)

  const[userId, setUserId] = useState(null);

  const[step, setStep] = useState(0)

  const[name, setName] = useState('');

  const[surname, setSurname] = useState('')

  const[group, setGroup] = useState('')

  const[isAuthorized, setIsAuthorized] = useState(false)

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
    }
  ];

  const question = questions[step];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanGroup = group.trim();

    if (
      cleanName === '' || cleanSurname === '' || cleanGroup === '') {
      alert('Ошибка: Поля не могут быть пустыми!');
      return 1;
    }
    
    try {
      const { data: searchData, error: searchError } = await supabase
        .from('users_results')
        .select()
        .match({'surname': surname, 'name': name, 'group': group})

      if (searchError) throw searchError;

      if (searchData.length !== 0) {
        setIsAuthorized(true);
        setUserId(searchData[0].id)
        setAttempt(searchData[0].attempt)
        setCorrect(searchData[0].correct)
      } else {
        const { data: inpData, error: inpError } = await supabase
          .from('users_results')
          .insert([
            { 
              'name': name,
              'surname': surname,
              'group': group,
              'attempt': attempt,
              'correct': correct
            }
          ])
          .select();

        if (inpError) throw inpError;

        if (inpData && inpData.length > 0) {
          setIsAuthorized(true);
          setUserId(inpData[0].id)
        }
      }
      
    } catch (err) {
      console.error("Supabase Error:", err);
      alert('Не удалось войти');
    }
  };

  async function onClickVariant(index) {

    const actualCorrect = index === question.correct ? correct + 1 : correct;
  
    setStep(step + 1)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }

    if (step + 1 === questions.length) {

      setAttempt(true)

      try {
        const {data, error} = await supabase
          .from('users_results')
          .update({ 'attempt': true, 'correct': actualCorrect})
          .eq('id', userId)
        
          if (error) throw error;
      } catch(err) {
        console.error("Supabase Error:", err)
      }
    }
  }

  return (
    <div className="App">
      {(isAuthorized) ?
        (attempt || step >= questions.length) ?
          <Result correct={correct} questions={questions}/> 
        :
          <Game questions={questions} question={question} onClickVariant={onClickVariant} step={step} setStep={setStep} correct={correct} /> 
      :
        <Autorisation setGroup={setGroup} setName={setName} setSurname={setSurname} surname={surname} name={name} group={group} handleSubmit={handleSubmit} />
      }
    </div>
  );
}

export default App;
