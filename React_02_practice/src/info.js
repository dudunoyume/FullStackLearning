import React from "react";
import Message from "./Message";

const info = ({ messages, setMessages }) => {
  return (
    <div>
        {/* {messages.map((msg) => (
        <p>{msg.input}</p>
      ))} */}
        {messages.map((msg) => (
        <Message msg={msg} key={msg.id}  messages={messages} setMessages={setMessages} />
      ))}


    </div>
  );
};

export default info;
