function Result(props) {
    return (
        <>
            <div className="result">
                <img src="./congratulation.png" alt="Поздравление" />
                <h2>Вы отгадали {props.correct} ответа из {props.questions.length}</h2>
                <button onClick={() => props.setStep(0)}>Попробовать снова</button>
            </div>
        </>
    )
}

export default Result;