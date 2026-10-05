function Result(props) {
    return (
        <>
            <div className="result">
                <img src="./congratulation.png" alt="Поздравление" />
                <h2>Ваш результат {props.correct/props.questions.length*100}%</h2>
                <button onClick={() => props.setStep(0)}>Попробовать снова</button>
            </div>
        </>
    )
}

export default Result;