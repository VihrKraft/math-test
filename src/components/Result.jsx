import congPin from '../img/congratulation.jpg'


export const Result = (props) => {
    return (
        <>
            <div className="result">
                <img src={congPin} style={{ width: '80%', height: 'auto' }} alt="Поздравление" />
                <h2>{`Пользователь: ${props.name.charAt(0).toUpperCase() + props.name.slice(1)} ${props.surname.charAt(0).toUpperCase() + props.surname.slice(1)} из группы ${props.group}`}</h2>
                <h2>{`Ваш вариант: ${props.option}`}</h2>
                <h2>Ваш результат: {Math.round(props.correct/props.questions.length*100)}%</h2>
            </div>
        </>
    )
}