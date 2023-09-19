"use client";
import React from "react";

function ChatAdmin(props) {
  console.log("Admin cliente", props);
  function renderUser(user) {
    if (user.id === props.yourId) {
      return (
        <ul className="cursor-pointer" key={user.id}>
          <li> {user.name}</li>
        </ul>
      );
    }
    const currentChat = {
      chatName: user.username,
      isChannel: false,
      receiverId: user.id,
    };
    console.log("current chat", currentChat);
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          props.toggleChat(currentChat);
        }}
        key={user.id}>
        {user.username}
      </div>
    );
  }

  const filteredUsers = props.allUsers?.filter(
    (user) => user.id !== "12345678907"
  );

  function renderMessages(message, index) {
    console.log(message);
    return (
      <div
        key={index}
        className={`flex flex-col px-10 py-4 items-${
          message.sender === "AutoConnect" ? "end" : "start"
        }`}>
        <div className="flex flex-col">
          <h4
            className={`font-bold ${
              message.sender === "AutoConnect"
                ? "text-orange-500 text-right"
                : "text-blue-500 text-left"
            }`}>
            {message.sender}
          </h4>
        </div>
        <div className="flex">
          <div
            className={`relative ${
              message.sender === "AutoConnect" ? "items-start" : "items-end"
            }`}>
            <p className="bg-white p-3 rounded-lg shadow-md relative">
              {message.content}
            </p>
            <div
              className={`w-4 h-4 bg-white absolute top-1/2 ${
                message.sender === "AutoConnect"
                  ? "right-[-8px]"
                  : "left-[-8px]"
              } transform -translate-y-1/2  bg-white rotate-45 z-0`}></div>
          </div>
        </div>
      </div>
    );
  }

  let body;

  body = <>{props.messages?.map(renderMessages)}</>;

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault(), props.sendMessage();
    }
  }

  return (
    <div className="h-[70vh] w-full flex">
      {props.yourId === "3456789" && (
        <div className=" w-1/6 border-r border-black pl-4 pt-4">
          <h3>All users</h3>
          {filteredUsers?.map(renderUser)}
        </div>
      )}
      <div className="w-5/6 flex flex-col">
        <div className="h-10 w-full border-b border-black">
          {props.currentChat.chatName}
        </div>
        <div className="h-[50vh] w-full overflow-scroll border-b border-black">
          {body}
        </div>
        <div className="flex pt-4 pl-2">
          <textarea
            className="h-15 w-[80%] resize-none p-2 rounded "
            value={props.message}
            onChange={props.handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje"></textarea>
          <button
            className=" bg-naranja_enf text-white py-2 px-4 ml-2 rounded"
            onClick={props.sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChatAdmin;
