import { useState } from "react";
import "./font/ChungjuKimSaeng.ttf"
import "./App.css";
import Start from "./components/Start";
import Categories from './components/Categories';
import quizData from './data/quizData.json';
import QuizPage from "./components/QuizPage";
import Results from "./components/Results";

// 카테고리 > 문제 > 완료 순서로 진행되어야 함 
/*
app.js 에서 위 3개가 다 보여져야함. 
usestate선언 후 조건문 사용해서 각 페이지가 보여지도록 설정하기
 */


const App = () => {

  // 카테고리의 기본값 공백으로 설정 
  //선택한 카테고리가 ''로 설정되며 그 페이지로 넘어가도록 설정  
  const [category,setCategory] = useState('');

  //첫 페이지의 기본값 false로 설정
  // true값으로 바뀔 시 첫페이지는 안보임 
  const [start, setStart] = useState(false);

  // quiz의 기본값 공백 배열로 설정 
  // 
  const [filterQuiz,setfilterQuiz] = useState([]);

  // 마지막 페이지의 기본값 flase 로 설정 
  const [finish,setFinish] = useState(false);

  // 점수 기본값 0으로 설정
  const [score,setScore] = useState(0);

  //마지막 문제 화면 state
  const [lastQuestion, setLastQuestion] = useState(false);

  //카테고리 선택후 실행하는 함수 
  const onSelectCategory = (select)=>{
    // 카테고리 선택 
    setCategory(select);
    //quizData에서 선택한 카테고리의 문제만 새로 만듬.
    //filter() : 주어진 함수를 만족하는 모든 요소를 모아 새로운 배열로 반환하는 메서드
    const quizes = quizData.quizzes.filter((data)=>{
      return data.category === select;
    });
    setfilterQuiz(quizes);
  }

  // 다시 시작 함수 
  // state : 버튼 누른 값(true / false) -> Result.js에서 넘겨져서 받는값
  // state 값에 따라 setStart의 값이 true / false로 바뀌며 
  // 첫화면으로 갈지 카테고리 선택화면으로 갈지 정해짐
  const handleReStart = (state)=>{
    setCategory('');
    setFinish(false);
    setScore(0);
    setStart(state);
    setLastQuestion(false);
  }

  //퀴즈 점수 반영 함수 
  const handleScore = () => {
    //점수 누적을 위해 이전값 불러오고 점수(20) 더하기 
    setScore((prev) => {
      return prev+20
    });
    
  }

  //각 화면별로 bg 색상 다르게 하기 
  let bgClass = 'bg bg-1';  // 기본 bgClass는 bg-1이 보여지도록 선언 

  if( start && !category && !finish ){ 
    bgClass = "bg bg-2";  //카테고리 화면
  } else if( start && category && !finish && !lastQuestion) { 
    bgClass= "bg bg-3" ; // 문제 화면
  }else if( start && category && !finish && lastQuestion) { 
    bgClass= "bg bg-4" ; //마지막 문제 화면 
  }else if( finish ){
    bgClass = "bg bg-5";  // 점수 화면 
  } else {
    bgClass = 'bg bg-1'; // 아무것도 아닐때는 첫화면 
  }

  return (
    <div className={bgClass}>
      <div id='app'>
        {
          // 시작페이지가 true일 때 보여지도록 설정 
          // 시작페이지에 값이 들어오면 false로 뒷 문장 실행 x -> 안보여짐 
          !start && <Start onStart = {() => {setStart(true)}}/>

        }
        
        {
          // true(카테고리) && true(마지막페이지)  && 실행 
          //category에 값이 없고 마지막페이지가 아닐 때 category가 실행되도록 설정
          start && !category && !finish && <Categories 
            categories={quizData.categories}
            onSelect={onSelectCategory}/>
        }
        {
          // quiz 페이지 관리
          start && category && !finish && <QuizPage 
            quizes={filterQuiz} 
            onFinish={setFinish}
            onScore={handleScore}
            onLastQuestion = {setLastQuestion}
            />
        }
        {
          // result 페이지 관리 
          // true(마지막페이지) 
          finish && <Results score = {score} onReStart={handleReStart}/>
        }

      </div>
    </div>
  )
}

export default App