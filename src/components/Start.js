
import React from 'react'

const Start = ({onStart}) => {
  return (
    <div id="start">
      <p className="title">입문자용<br/>한국어 시험</p>
      <p className="goCategory btn" onClick={onStart}>과목선택</p>
    </div>
  )
}

export default Start
