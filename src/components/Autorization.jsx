import '../Autorization.css'


export const Autorisation = (props) => {
    return(
        <>
        <form action="" onSubmit={(e) => props.handleSubmit(e)}>
            <h1 className='jumping'>Авторизация</h1>
            <div className="f-el">
                <label className='title jumping'>{"Фамилия: "}</label>
                <input type="text" onChange={(event) => props.setSurname(event.target.value.toLowerCase())}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Имя: "}</label>
                <input type="text" onChange={(event) => props.setName(event.target.value.toLowerCase())}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Группа: "}</label>
                <input type="text" onChange={(event) => props.setGroup(event.target.value.toLowerCase())}/>
            </div>
            <button>Отправить</button>
        </form>

        {/* <Game questions={props.questions} question={props.question} onClickVariant={props.onClickVariant} step={props.step} setStep={props.setStep} correct={props.correct}/> */}
        </>
    )
}