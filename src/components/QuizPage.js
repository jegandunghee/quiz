import { useState } from "react"

const QuizPage = ({quizes,onFinish,onScore, onLastQuestion}) => {

  // 문제 번호 지정, 기본값 0
  // current++를 지정한적이 없는데 어떻게 문제가 바뀌는지..?
  // 클릭 한번당 +1   
  const [current,setCurrent] = useState(0);

  const handleClick = (idx)=>{
    //정답 체크 
    //idx : user가 선택한 항목의 인덱스 값을 받음 
    // idx의 값이 quizes[current]의 correct의 값과 같다면 점수 +20을 함 
    if(idx+1 === quizes[current].correct){
      //정답이면 +20
      onScore();
    }

    //다음에 나올 화면의 idx번호를 미리 받음 
    const nextIdx = current +1;

    //마지막 문제인지 확인하기 
    const isLast = nextIdx === quizes.length -1;
    onLastQuestion(isLast);

    
    // current의 값이 quizes의 값을 넘으면 마지막 페이지로 이동
    if( nextIdx < quizes.length ){
      setCurrent(nextIdx);
    } else {
      onFinish(true);
    }
  }

  return (
    <div id="quiz-page">

      <p className="qNum">문제 ({current+1}/{quizes.length})</p>

      <h3>{quizes[current].question}</h3>

      <ul className="choices">
        {
          quizes[current].choices.map((item,idx)=>{
            return (
              <li className="item" key={idx} 
                onClick={ () =>{handleClick(idx)}}>{item}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default QuizPage