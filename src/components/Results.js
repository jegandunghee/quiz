import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

const Results = ({ onReStart, score, onShowReview }) => {
  const { width, height } = useWindowSize();

  return (
    <div id="result">
      {/* 50점 이상이면 꽃가루 효과 */}
      {score >= 50 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
          colors={["#f0c27f", "#a0c4ff", "#fdffb6", "#caffbf", "#ffc6ff", "#ffadad"]}
        />
      )}

      <h3>시험 종료</h3>
      <h1>점수 : {score}점</h1>

      <div className="btn_wrap">
        <p className="btn" id="result-home-btn" onClick={() => { onReStart(false) }}>HOME</p>
        <p className="btn" id="result-restart-btn" onClick={() => { onReStart(true) }}>다시하기</p>
      </div>

      {/* 해설 보러가기 버튼 */}
      <div className="review-btn-wrap">
        <p className="btn review-btn" id="result-review-btn" onClick={onShowReview}>
          해설 보러가기
        </p>
      </div>
    </div>
  )
}

export default Results