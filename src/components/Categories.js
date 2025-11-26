const Categories = ({categories,onSelect}) => {  
  return (
    <div id="categories">
      <h2>과목을 선택해주세요</h2>
      <ul>
        {
          categories.map((item,idx)=>{
            return (
              <li className="btn" key={idx}
                  onClick={()=>{onSelect(item)}}
              >{item}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Categories