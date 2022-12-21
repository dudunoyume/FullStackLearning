import React from "react";
import ReactDOM from "react-dom";
// 這樣引用CSS
import "./styles/style.css";
// Props (Properties) Every component in react has its own properties 每個component 都有他的properties
import Friend from "./friend.js";

// ejs >>>>>>>>　　　<%%> <%= %>
// JS in JSX >>>>>>>>　 {}
const App = () => {
  let friends = [
    { name: "Herry", age: 17, desc: " Harry is a good guy" },
    { name: "Ron", age: 20, desc: "Ron is a bad guy" },
    { name: "Snap", age: 25, desc: " Snap is a fuck guy" },
  ];
  return (
    <div>
      {/* inline styling CSS  */}
      {/* 這邊沒有 font-size 而是 fontSize 是因為這裡是JS，無法使用 - */}
      <h1 style={{ color: "red", fontSize: "2rem" }}>My profile</h1>
      <p>My name is Mile.</p>
      <p>I am {5 + 10}</p>
      {
        // map 這裡的 for loop
        friends.map((friend) => {
          return <p>{friend.age}</p>;
        })
      }

      {
        // map 可以把 return 省略，還有arrow之後的刪掉
        friends.map((friend) => (
          <p>{friend.name}</p>
        ))
      }
      <p>friends are</p>
      {friends.map((friend) => (
        <Friend name={friend.name} age={friend.age} desc={friend.desc} />
      ))}
    </div>
  );
};

export default App;
