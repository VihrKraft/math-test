import '../Game.css'
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';


export const Game = (props) => {
    const percentage = Math.round(props.step/props.questions.length*100)

    const progbarstyles = {
        width: `${percentage}%`,
        backgroundColor: 'white',
    }

    return (
        <>
            <div className='progress'>
                <div style={progbarstyles} className='progress__inner'></div>
            </div>
            <h1 className='quess-title'>{props.step !== props.questions.length ? props.question.title : null}</h1>
            <ul>
                {props.step !== props.questions.length ?
                    props.question.variants.map((item, index) => (   
                        <li onClick={() => {props.onClickVariant(index)}} key={index}><InlineMath math={item}/></li>
                    ))
                :   
                    null
                }                
            </ul>
        </>
    )
}