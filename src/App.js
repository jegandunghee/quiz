import { useState } from "react";
import "./font/ChungjuKimSaeng.ttf"
import "./App.css";
import Start from "./components/Start";
import Categories from './components/Categories';
import quizData from './data/quizData.json';
import QuizPage from "./components/QuizPage";
import Results from "./components/Results";
import Review from "./components/Review";

const App = () => {

  // 카테고리의 기본값 공백으로 설정
  const [category, setCategory] = useState('');

  // 첫 페이지의 기본값 false로 설정
  const [start, setStart] = useState(false);

  // 필터링된 퀴즈 목록
  const [filterQuiz, setfilterQuiz] = useState([]);

  // 마지막 페이지(결과) 여부
  const [finish, setFinish] = useState(false);

  // 점수
  const [score, setScore] = useState(0);

  // 마지막 문제 화면 state
  const [lastQuestion, setLastQuestion] = useState(false);

  // 해설 화면 표시 여부
  const [showReview, setShowReview] = useState(false);

  // 카테고리 선택 후 실행하는 함수
  const onSelectCategory = (select) => {
    setCategory(select);
    const quizes = quizData.quizzes.filter((data) => {
      return data.category === select;
    });
    setfilterQuiz(quizes);
  }

  // 다시 시작 함수
  const handleReStart = (state) => {
    setCategory('');
    setFinish(false);
    setScore(0);
    setStart(state);
    setLastQuestion(false);
    setShowReview(false);
  }

  // 퀴즈 점수 반영 함수
  const handleScore = () => {
    setScore((prev) => prev + 20);
  }

  // HOME으로 돌아가기 (해설 화면에서 사용)
  const handleGoHome = () => {
    handleReStart(false);
  }

  // 각 화면별로 bg 색상 다르게 하기
  let bgClass = 'bg bg-1';

  if (showReview) {
    bgClass = "bg bg-review";        // 해설 화면
  } else if (start && !category && !finish) {
    bgClass = "bg bg-2";             // 카테고리 화면
  } else if (start && category && !finish && !lastQuestion) {
    bgClass = "bg bg-3";             // 문제 화면
  } else if (start && category && !finish && lastQuestion) {
    bgClass = "bg bg-4";             // 마지막 문제 화면
  } else if (finish) {
    bgClass = "bg bg-5";             // 점수 화면
  } else {
    bgClass = 'bg bg-1';             // 첫 화면
  }

  return (
    <div className={bgClass}>
      <div id='app'>
        {/* 시작 화면 */}
        {!start && !showReview && <Start onStart={() => { setStart(true) }} />}

        {/* 카테고리 선택 화면 */}
        {start && !category && !finish && !showReview &&
          <Categories
            categories={quizData.categories}
            onSelect={onSelectCategory}
          />
        }

        {/* 퀴즈 풀이 화면 */}
        {start && category && !finish && !showReview &&
          <QuizPage
            quizes={filterQuiz}
            onFinish={setFinish}
            onScore={handleScore}
            onLastQuestion={setLastQuestion}
          />
        }

        {/* 결과 화면 */}
        {finish && !showReview &&
          <Results
            score={score}
            onReStart={handleReStart}
            onShowReview={() => setShowReview(true)}
          />
        }

        {/* 해설 화면 */}
        {showReview &&
          <Review
            quizes={filterQuiz}
            onHome={handleGoHome}
          />
        }
      </div>
    </div>
  )
}

export default App