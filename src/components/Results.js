const Results = ({onReStart, score}) => {
  return (
    <div id="result">
      <h3>시험 종료</h3>
      <h1>점수 : {score}점</h1>
      <div className="btn_wrap">
        <p className="btn" onClick={ () => {onReStart(false)} }>HOME</p>
        <p className="btn" onClick={() => {onReStart(true)}}>다시하기</p>
      </div>
    </div>
  )
}

export default Results