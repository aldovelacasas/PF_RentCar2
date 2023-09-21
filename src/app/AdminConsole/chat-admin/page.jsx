"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import ChatAdmin from "../../../components/ChatAdmin";
import io from "socket.io-client";
import immer from "immer";
import { withAuth } from "@/withAuth";

const initialMessagesState = {};

function Admin() {
  const [username, setUsername] = useState({
    username: "AutoConnect",
    id: "1234567890",
  });
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    chatName: "",
    receiverId: "",
  });
  const [connectedRooms, setConnectedRooms] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState([]);
  const [selected, setSelected] = useState("");
  const socketRef = useRef();

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {
    setMessage("");
    console.log("miraaaaaaa", initialMessagesState);
  }, [messages]);

  function sendMessage() {
    const payload = {
      content: message,
      to: currentChat.receiverId,
      sender: username.username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel,
    };
    socketRef.current.emit("send message", payload);
    const newMessages = immer(messages, (draft) => {
      draft[currentChat.chatName].push({
        sender: username.username,
        content: message,
      });
    });
    setMessages(newMessages);
  }

  function toggleChat(currentChat) {
    if (!messages[currentChat.chatName]) {
      const newMessages = immer(messages, (draft) => {
        draft[currentChat.chatName] = [];
      });

      setMessages(newMessages);
    }
    setCurrentChat(currentChat);
    setSelected(currentChat.chatName);
  }

  function connect() {
    setConnected(true);
    socketRef.current = io.connect("https://car-conn.fly.dev");
    socketRef.current.emit("join server", username);
    socketRef.current.on("new user", (allUsers) => {
      setAllUsers(allUsers);
    });
    socketRef.current.on("new message", ({ content, sender, chatName }) => {
      setMessages((messages) => {
        const newMessages = immer(messages, (draft) => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender });
          } else {
            draft[chatName] = [{ content, sender }];
          }
        });
        return newMessages;
      });
    });
  }

  let body;
  if (connected) {
    body = (
      <ChatAdmin
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={"3456789"}
        //  cambie id por ids
        allUsers={allUsers}
        connectedRooms={connectedRooms}
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
        selected={selected}
      />
    );
  } else {
    body = (
      <div className="w-screen h-[70vh] flex items-center justify-center">
        <form>
          <button
            className="p-2 bg-naranja_enf text-white rounded-full w-64"
            onClick={connect}>
            Conectarse como Admin
          </button>
        </form>
      </div>
    );
  }

  return <div> {body} </div>;
}

export default withAuth(Admin);
