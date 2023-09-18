"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { ClientChat } from "./ClientChat";

const UID = "f9uS0UO0inS6fk1qd25HSGgiZ6O2";
export default function ChatBar() {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useAuth();
  let showChat = false;
  if (user === null) {
    showChat = true;
  } else if (user.uid != UID) {
    showChat = true;
  }
  if (showChat)
    return (
      <div className={`fixed bottom-16 left-1 ${isOpen ? "w-64" : "w-16"}`}>
        <button
          className="p-2 bg-naranja_enf text-white rounded-full fixed bottom-4 left-4 w-64"
          onClick={openChat}>
          {isOpen ? "Cerrar Chat" : "Chatea con nosotros"}
        </button>
        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 absolute bottom-1 left-4">
            <ClientChat openChat={openChat} />
            <br />
          </div>
        )}
      </div>
    );
  else return <></>;
}
