const Categories = ({categories,onSelect}) => {  
  return (
    <div id="categories">
      <h2>과목 선택</h2>
      <ul>
        {
          categories.map((item,idx)=>{
            return (
              <li key={idx}
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