"use client";
import React from "react";
import { Rubik, Poppins } from "next/font/google";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const poppins = fontPoppins.className;
const rubik = fontRubik.className;

function ChatAdmin(props) {
  function renderUser(user) {
    const currentChat = {
      chatName: user.username,
      isChannel: false,
      receiverId: user.id,
    };

    return (
      <div
        className={`cursor-pointer border-b border-gray-300 py-3 px-4 hover:bg-naranja_enf ${
          props.selected == user.username ? "bg-naranja_enf" : ""
        }`}
        onClick={() => {
          props.toggleChat(currentChat);
        }}
        key={user.id}>
        <p className={`text-lg font-medium ${poppins}`}>{user.username}</p>
      </div>
    );
  }

  const filteredUsers = props.allUsers?.filter(
    (user) => user.id !== "12345678907"
  );

  function renderMessages(message, index) {
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
            <p className="bg-white p-3 rounded-lg shadow-md relative max-w-[35vh]">
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
          <h2 className={`${rubik}`}>Usuarios</h2>
          {filteredUsers?.map(renderUser)}
        </div>
      )}
      <div className="w-5/6 flex flex-col">
        <div className="h-10 w-full"></div>
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
