import congPin from '../img/congratulation.jpg'
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


export const Result = (props) => {
    return (
        <>
            <div className="result">
                <img src={congPin} style={{ width: '80%', height: 'auto' }} alt="Поздравление" />
                <h2>{`Пользователь: ${props.name.charAt(0).toUpperCase() + props.name.slice(1)} ${props.surname.charAt(0).toUpperCase() + props.surname.slice(1)} из группы ${props.group}`}</h2>
                <h2>{`Ваш вариант: ${props.option}`}</h2>
                <h2>Ваш результат: {Math.round(props.correct/props.questions.length*100)}%</h2>
                <br/><br/>
                <h2 style={{textAlign: 'left'}}>Вопросы и ответы:</h2>
                {props.questions.map((question, index) => {

                    const isCorrectAnwser = props.clickedRes[index] === question.correct;

                    return (
                    <>
                        <div key={index}>
                            <h2 style={{textAlign: 'justify'}}>{question.title}</h2>
                            <ul>
                                {question.variants.map((variant, id) => {

                                    const isChosenVar = id === props.clickedRes[index]
                                    const isActualCorrectAnswer = id === question.correct
                                    
                                    let bgc

                                    if (isCorrectAnwser && isChosenVar) {
                                        bgc = {backgroundColor: '#20d500'}
                                    } else if (!isCorrectAnwser && isChosenVar) {
                                        bgc = {backgroundColor: '#e50404'}
                                    } else if (!isCorrectAnwser && isActualCorrectAnswer) {
                                        bgc = {backgroundColor: '#42aaf5'}
                                    }

                                    return <li style={bgc} key={id}><InlineMath math={variant}/></li>
                                })}
                            </ul>
                        </div>
                        <br/>
                    </>
                )})}
            </div>
        </>
    )
}