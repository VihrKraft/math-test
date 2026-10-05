import '../Game.css'
import Result from './Result'


function Game(props) {
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
            <h1>{props.step !== props.questions.length ? props.question.title : null}</h1>
            <ul>
                {props.step !== props.questions.length ?
                    props.question.variants.map((item, index) => (   
                        <li onClick={() => {props.onClickVariant(index)}} key={index}>{item}</li>
                    ))
                :   
                    <Result correct={props.correct} questions={props.questions} setStep={props.setStep}/>       
                }                
            </ul>
        </>
    )
}

export default Game;