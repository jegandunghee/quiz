import { useState } from "react";

// 해설 텍스트에서 정답 보기의 설명 부분에 밑줄/강조 스타일 적용
// explanation 텍스트를 파싱하여 choices 배열의 correct 인덱스에 해당하는 부분 강조
const HighlightedExplanation = ({ explanation, choices, correct }) => {
  // 정답 보기 텍스트 (1-based index → 0-based)
  const correctChoice = choices[correct - 1];

  // explanation 을 " / " 혹은 ". " 로 분리하지 않고
  // 각 보기를 구분자로 사용하여 split한 뒤 렌더
  // 형식: "보기1 : 설명. 보기2 : 설명." 이므로 ". " 기준으로 문장 분리
  const sentences = explanation.split(". ").filter(Boolean);

  return (
    <div className="explanation-text">
      {sentences.map((sentence, idx) => {
        // 이 문장이 정답 보기를 포함하는지 확인
        const isCorrect = sentence.startsWith(correctChoice);
        return (
          <p
            key={idx}
            className={isCorrect ? "explanation-sentence correct-sentence" : "explanation-sentence"}
          >
            {sentence}{idx < sentences.length - 1 ? "." : ""}
          </p>
        );
      })}
    </div>
  );
};

const Review = ({ quizes, onHome }) => {
  const [current, setCurrent] = useState(0);
  const total = quizes.length;
  const quiz = quizes[current];
  const isFirst = current === 0;
  const isLast = current === total - 1;

  const handlePrev = () => {
    if (!isFirst) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrent(current + 1);
  };

  return (
    <div id="review">
      {/* 상단 헤더 */}
      <div className="review-header">
        <p className="review-qNum">문제 해설 ({current + 1}/{total})</p>
      </div>

      {/* 문제 카드 영역 (key로 fade-in 트리거) */}
      <div className="review-card" key={current}>
        {/* 문제 텍스트 */}
        <h3 className="review-question">{quiz.question}</h3>

        {/* 보기 4개 */}
        <ul className="review-choices">
          {quiz.choices.map((choice, idx) => (
            <li
              key={idx}
              className={`review-choice-item ${idx + 1 === quiz.correct ? "correct-choice" : ""}`}
            >
              {choice}
            </li>
          ))}
        </ul>

        {/* 해설 섹션 */}
        <div className="review-explanation-section">
          <p className="review-explanation-title">해설</p>
          <div className="review-explanation-box">
            <HighlightedExplanation
              explanation={quiz.explanation}
              choices={quiz.choices}
              correct={quiz.correct}
            />
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="review-nav">
        {/* 이전 버튼 */}
        <button
          className={`review-nav-btn ${isFirst ? "disabled" : ""}`}
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="이전 문제"
        >
          &lt;
        </button>

        {/* 마지막 문제에서 HOME 버튼 표시 */}
        {isLast && (
          <button className="review-home-btn" onClick={onHome} id="review-home-btn">
            HOME
          </button>
        )}

        {/* 다음 버튼 */}
        <button
          className={`review-nav-btn ${isLast ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={isLast}
          aria-label="다음 문제"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Review;
