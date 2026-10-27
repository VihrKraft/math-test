import '../Autorization.css'


export const Autorisation = (props) => {
    return(
        <>
        <form action="" onSubmit={(e) => props.handleSubmit(e, props.option)}>
            <h1 className='jumping'>Авторизация</h1>
            <div className="f-el">
                <label className='title jumping'>{"Фамилия: "}</label>
                <input type="text" value={props.surname} placeholder='Иванов' onChange={(event) => props.setSurname(event.target.value.slice(0, 20))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Имя: "}</label>
                <input type="text" value={props.name} placeholder='Иван' onChange={(event) => props.setName(event.target.value.slice(0, 20))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Группа: "}</label>
                <input type="text" value={props.group} placeholder='0к9091' onChange={(event) => props.setGroup(event.target.value.slice(0, 6))}/>
            </div>
            <div className="f-el">
                <label className='title jumping'>{"Вариант: "}</label>
                <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'right', width: 'auto'}}>
                    {props.options.map((option, id) => (
                        <li key={id} style={{margin: '0 5px'}} className={`clickable ${option === props.option ? 'active' : ''}`} onClick={() => props.setOption(option)}>{option}</li>
                    ))}
                </ul>
            </div>
            <button>Отправить</button>
        </form>
        </>
    )
}