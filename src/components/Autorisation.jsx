import Game from './Game'
import '../Autorisation.css'


export const Autorisation = (props) => {
    return(
        <>
        <form action="">
            <h1 className='jumping'>Авторизация</h1>
            <div className="f-el">
                <label className='title jumping'>{"Фамилия: "}</label>
                <input type="text" onChange={(event) => props.changeSurname(event.target.value)}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Группа: "}</label>
                <input type="text" onChange={(event) => props.changeGroup(event.target.value)}/>
            </div>
            <button>Отправить</button>
        </form>

        {/* <Game questions={props.questions} question={props.question} onClickVariant={props.onClickVariant} step={props.step} setStep={props.setStep} correct={props.correct}/> */}
        </>
    )
}