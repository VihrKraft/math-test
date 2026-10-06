export const Result = (props) => {
    return (
        <>
            <div className="result">
                <img src="./congratulation.png" alt="Поздравление" />
                <h2>Ваш результат {props.correct/props.questions.length*100}%</h2>
            </div>
        </>
    )
}