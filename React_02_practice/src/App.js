import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Create from "./Create";
import Info from "./info";
// 這樣引用CSS
import "./styles/style.css";

// event handling

const App = () => {
  // button click handler
  const buttonHandler = (e) => {
    e.preventDefault();
    let date = new Date().toLocaleDateString();
    alert(date);
  };

  // button click second handler
  const SbuttonHandler = (msg) => {
    alert(msg);
  };

  // State
  let [name, setName] = useState("Panda Wang");
  const changeNameHandler = () =>{
    setName("Mike Wang");
  }

  // 將 State 傳給下層的Create.js
  let [messages,setMessages] = useState([]);

  // 有點像node.js 的 middleware 的一個東西，當你的一些東西改變了就會使用這個
  useEffect(()=>{
    console.log("useEffect function is running.");

  },[name])

  return (
    <div>
      <form action="">
        <input type="text" />
        <button onClick={buttonHandler}>Submit</button>
      </form>

      {/* SbuttonHandler("Hello how are you")   內部如果直接放入 屬性 就會直接執行*/}
      {/* <button onClick={SbuttonHandler("Hello how are you")}> Hello</button> */}

      {/* 要再另外加入一個 arrow function 才能避免直接執行 */}
      <button
        onClick={() => {
          SbuttonHandler("Hello how are you");
        }}
      >
        {" "}
        Hello
      </button>
      <p></p>

      <h1>{name}</h1>
      <button onClick={changeNameHandler}>Change Name</button>

      {/* 將 State 傳給下層的Create.js */}
      <Create messages={messages} setMessages={setMessages}/>
      <Info messages={messages} setMessages={setMessages}/>
    </div>
  );
};
export default App;
