import React from "react";
import ReactDOM from "react-dom";
import App from "../../React_02_practice/src/App.js";

ReactDOM.render(
  <React.StrictMode>
    <App/> 
  </React.StrictMode>,
  document.querySelector("#root")
)



















// function App(){
//   //   tag - css - text
//   return React.createElement("h1", null,"This is React App.");
// }


// 一次放入多個 element
// function App2(){
//   return React.createElement("div", null,[
//     React.createElement("h1", {style:{ color : "red"}}, "My name is Mike Huang."),
//     React.createElement("p", null, "fsdfsdf"),
//     React.createElement("button", null, "Check you profile"),

//   ]);
// }

// ReactDOM.render(React.createElement(App2), document.querySelector("#root"));


// function App(){
//   return (
//     <div>
//       <h1> My profile</h1>
//       <p>My name is Mike Huang.</p>
//       <button></button>
//     </div>
//   )
// }

// ReactDOM.render(App(), document.querySelector("#root"));