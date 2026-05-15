const Categories = ({categories,onSelect}) => {  
  return (
    <div id="categories">
      <h2>과목을 선택해주세요</h2>
      <ul>
        {
          // 전달받은 categories 배열을 순회하며 과목 버튼 렌더링
          categories.map((item,idx)=>{
            return (
              <li className="btn" key={idx}
                  onClick={()=>{onSelect(item)}} // 버튼 클릭 시 선택한 과목명을 App.js로 전달
              >{item}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Categories