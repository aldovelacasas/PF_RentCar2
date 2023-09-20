import { useState, useEffect } from "react";
import Form from "./UsernameForm";
import ChatClient from "./ChatClient";
import io from "socket.io-client";
import immer from "immer";
const initialMessagesState = {};

export const ClientChat = ({ openChat, socketRef }) => {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({
    chatName: "AutoConnect",
    receiverId: "12345678907",
  });
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  useEffect(() => {
    setMessage("");
    console.log(initialMessagesState);
  }, [messages]);

  function sendMessage() {
    const payload = {
      content: message,
      to: currentChat.receiverId,
      sender: username,
      chatName: currentChat.chatName,
    };
    socketRef.current.emit("send message", payload);
    const newMessages = immer(messages, (draft) => {
      if (!draft[currentChat.chatName]) {
        draft[currentChat.chatName] = [];
      }
      draft[currentChat.chatName].push({
        sender: username,
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
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function connect() {
    setConnected(true);
    socketRef.current = io.connect("https://car-conn.fly.dev");
    socketRef.current.emit("join server", { username });
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
      <ChatClient
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={socketRef.current ? socketRef.current.id : ""}
        //  cambie id por ids
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
        openChat={openChat}
      />
    );
  } else {
    body = (
      <Form username={username} onChange={handleChange} connect={connect} />
    );
  }

  return <div> {body} </div>;
};
