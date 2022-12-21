import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 取得上面給的messages, setMessages  並回傳詳細設定給 APP.js
const Create = ( {messages, setMessages}) => {
    let [input, setInput] = useState("");

    const submitHandler = (e)=>{
        e.preventDefault();
        // 取值
        // console.log(e.target.parentElement.children[0].value);
        // 加入 uuid 去對應每一個message
        setMessages([...messages, {input, id:uuidv4()}]);
        setInput("");
    }

    const inputHandler = (e) =>{
        setInput(e.target.value);
    }
  return (
    <form action="">
        <input onChange={inputHandler} value= {input} type="text" />
        <button onClick={submitHandler}>Submit</button>
    </form>
  )
}

export default Create