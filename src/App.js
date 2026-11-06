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
  const[attempt, setAttempt] = useState(false);

  const[correct, setCorrect] = useState(0)

  const[userId, setUserId] = useState(null);

  const[step, setStep] = useState(0)

  const[name, setName] = useState('');

  const[surname, setSurname] = useState('')

  const[group, setGroup] = useState('')

  const[isAuthorized, setIsAuthorized] = useState(false)

  const[option, setOption] = useState(0);

  const options = questionsWithVariants.map((_, id) => {
    return id+1
  });

  const [questions, setQuestions] = useState([]);

  const [clickedRes, setClickedRes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanGroup = group.trim();

    if (cleanName === '' || cleanSurname === '' || cleanGroup === '') {
      alert('Ошибка: Поля не могут быть пустыми!');
      return;
    }

    let finalOption = Number(option); 

    try {
      const { data: searchData, error: searchError } = await supabase
        .from('users_results')
        .select()
        .match({'surname': surname.toLowerCase(), 'name': name.toLowerCase(), 'group': group.toLowerCase()})

      if (searchError) throw searchError;

      if (searchData.length !== 0) {
        const dbUser = searchData[0];
        
        setIsAuthorized(true);
        setUserId(dbUser.id);
        setAttempt(dbUser.attempt);
        setCorrect(dbUser.correct);
        setOption(dbUser.option);
        setClickedRes(dbUser.userChoice.map(Number));

        finalOption = Number(dbUser.option); 

      } else {
        if (finalOption <= 0) {
          alert('Ошибка: Не выбран вариант!');
          return;
        }

        const { data: inpData, error: inpError } = await supabase
          .from('users_results')
          .insert([
            { 
              'name': name.toLowerCase(),
              'surname': surname.toLowerCase(),
              'group': group.toLowerCase(),
              'attempt': attempt,
              'correct': correct,
              'option': finalOption
            }
          ])
          .select();

        if (inpError) throw inpError;

        if (inpData && inpData.length > 0) {
          setIsAuthorized(true);
          setUserId(inpData[0].id);
        }
      }
        
      setQuestions(questionsWithVariants[finalOption - 1]);
      
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

    const curChoice = [...clickedRes, index];

    setClickedRes(curChoice)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }

    if (step + 1 === questions.length) {

      setAttempt(true)

      try {
        const {error} = await supabase
          .from('users_results')
          .update({ 'attempt': true, 'correct': actualCorrect, 'userChoice': curChoice})
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
            question={question} 
            surname={surname} 
            name={name} 
            group={group}
            option={option}
            clickedRes={clickedRes}/>
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
          setOption={setOption}
          option={option}
          options={options}/>
      }
    </div>
  );
}

export default App;
