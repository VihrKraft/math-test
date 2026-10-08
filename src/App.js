import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import './App.css';
import { Autorisation } from './components/Autorization.jsx';
import { Game } from './components/Game.jsx';
import { Result } from './components/Result.jsx'
import questionsWithVariants from './constants/Questions.jsx'


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

  const[option, setOption] = useState(0);

  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedOption = Number(option); 
    let currentQuestions = [];

    if (selectedOption === 1) {
      currentQuestions = questionsWithVariants[0]
    } else if (selectedOption === 2) {
      currentQuestions = questionsWithVariants[1]
    } else {
      alert('Ошибка: Не указан вариант! или указан некорректно!');
      return 1;
    }

    setQuestions(currentQuestions)

    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanGroup = group.trim();

    if (cleanName === '' || cleanSurname === '' || cleanGroup === '') {
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
        setOption(searchData[0].option)
      } else {
        const { data: inpData, error: inpError } = await supabase
          .from('users_results')
          .insert([
            { 
              'name': name,
              'surname': surname,
              'group': group,
              'attempt': attempt,
              'correct': correct,
              'option': option
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

  const question = questions[step] || null;

  async function onClickVariant(index) {
    if (!question) return;

    const actualCorrect = index === question.correct ? correct + 1 : correct;
  
    setStep(step + 1)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }

    if (step + 1 === questions.length) {

      setAttempt(true)

      try {
        const {error} = await supabase
          .from('users_results')
          .update({ 'attempt': true, 'correct': actualCorrect, 'option': option})
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
          <Result 
            correct={correct} 
            questions={questions} 
            surname={surname} 
            name={name} 
            group={group}
            option={option}/> 
        :
          <Game 
            questions={questions} 
            question={question} 
            onClickVariant={onClickVariant} 
            step={step} 
            setStep={setStep} 
            correct={correct}/> 
      :
        <Autorisation 
          setGroup={setGroup} 
          setName={setName} 
          setSurname={setSurname} 
          surname={surname} 
          name={name} 
          group={group} 
          handleSubmit={handleSubmit}
          setOption={setOption}/>
      }
    </div>
  );
}

export default App;
