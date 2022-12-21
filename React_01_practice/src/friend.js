import React from 'react';


// 已可以不要寫 props
const Friend = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Name : {props.name}</h1>
      <h2>Age : {props.age}</h2>
      <h3>Desc: {props.desc}</h3>
    </div>
  )
}

export default Friend