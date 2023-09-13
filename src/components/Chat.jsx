"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

export default function Chat() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("send-mes", { user, message });
  }
  return (
    <div className="fixed bottom-0 right-0 border rounded-full w-1/4 h-1/4 m-1 bg-naranja_enf flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setUser(e.target.value)}
      />
      {!!user && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="message" onChange={(e) => e.target.value} />
        </form>
      )}
    </div>
  );
}
