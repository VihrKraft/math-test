import '../Autorization.css'


export const Autorisation = (props) => {
    return(
        <>
        <form action="" onSubmit={(e) => props.handleSubmit(e, props.option)}>
            <h1 className='jumping'>Авторизация</h1>
            <div className="f-el">
                <label className='title jumping'>{"Фамилия: "}</label>
                <input type="text" value={props.surname} onChange={(event) => props.setSurname(event.target.value.slice(0, 20))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Имя: "}</label>
                <input type="text" value={props.name} onChange={(event) => props.setName(event.target.value.slice(0, 20))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Группа: "}</label>
                <input type="text" value={props.group} onChange={(event) => props.setGroup(event.target.value.slice(0, 6))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Вариант: "}</label>
                <input type="text" value={props.option} onChange={(event) => props.setOption(event.target.value.slice(0, 1))}/>
            </div>
            <button>Отправить</button>
        </form>
        </>
    )
}