import React from 'react'
import "./styles/style.css"

//JSX class 已經用過，所以要改成 className

// 從info 接收App下來的 messages setMessages
function Message({msg,messages, setMessages}) {
    const deleteHandler = () =>{
        // 按下buttton 的瞬間找到所有不是你按下的那一個的文字 再 重新顯示出來
        setMessages(messages.filter((t) => t.id !== msg.id));
    }
  return (
    <div className='msg'>
            <p>{msg.input}</p>
            <button onClick={deleteHandler}>Delete</button>

    </div>

  )
}

export default Message