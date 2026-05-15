import { useState } from "react"

const QuizPage = ({quizes, onFinish, onScore}) => {

  // 문제 번호 지정, 기본값 0
  const [current, setCurrent] = useState(0);

  // 답변 선택 후 피드백 잠금 (연속 클릭 방지)
  const [answered, setAnswered] = useState(false);

  const handleClick = (idx) => {
    if (answered) return; // 이미 선택했으면 무시
    setAnswered(true);

    // 정답 체크: idx는 0-based, correct는 1-based
    if (idx + 1 === quizes[current].correct) {
      onScore();
    }

    // 다음 문제 인덱스
    const nextIdx = current + 1;


    // 0.5초 대기 후 다음 문제로 넘어가거나(퀴즈 진행), 마지막 문제라면 결과 화면으로 이동
    setTimeout(() => {
      if (nextIdx < quizes.length) {
        setCurrent(nextIdx);
        setAnswered(false);
      } else {
        onFinish(true);
      }
    }, 500);
  }

  // 진행률 계산 (1번 문제부터 가득 차도록)
  const progress = ((current + 1) / quizes.length) * 100;

  return (
    <div id="quiz-page">
      {/* 상단: 문제 번호 + 프로그레스 바 */}
      <div className="quiz-top">
        <p className="qNum">문제 ({current + 1}/{quizes.length})</p>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 문제 + 보기: key에 current를 줘서 문제 바뀔 때마다 fade-in 트리거 */}
      <div className="quiz-content fade-in" key={current}>
        <h3>{quizes[current].question}</h3>

        <ul className="choices">
          {quizes[current].choices.map((item, idx) => (
            <li
              className="item"
              key={idx}
              id={`choice-${idx}`}
              onClick={() => handleClick(idx)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default QuizPage