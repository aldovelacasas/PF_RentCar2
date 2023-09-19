"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { ClientChat } from "./ClientChat";
import { BsFillChatDotsFill, BsFillChatFill } from "react-icons/bs";

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
          className="p-2 bg-naranja_enf text-white rounded-full fixed bottom-4 left-4 shadow-md shadow-black hover:shadow-lg hover:shadow-black active:shadow-inner active:shadow-black"
          onClick={openChat}>
          {isOpen ? (
            <BsFillChatFill className="text-[3em] p-2 animate-[bouncing_1s_linear_1]" />
          ) : (
            <BsFillChatDotsFill className="text-[3em] p-2 animate-[bouncing_1s_linear_1]" />
          )}
        </button>
        {isOpen && (
          <div className="bg-white rounded-lg p-4 absolute bottom-4 left-2 shadow-md shadow-black">
            <ClientChat openChat={openChat} />
            <br />
          </div>
        )}
      </div>
    );
  else return <></>;
}
