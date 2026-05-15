
import React from 'react'

const Start = ({onStart}) => {
  return (
    // 첫 화면 UI 렌더링, '과목선택' 클릭 시 App.js의 start 상태를 true로 변경
    <div id="start">
      <p className="title">입문자용<br/>한국어 시험</p>
      <p className="goCategory btn" onClick={onStart}>과목선택</p>
    </div>
  )
}

export default Start
