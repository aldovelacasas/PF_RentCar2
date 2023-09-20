import { Rubik } from "next/font/google";
import { useTranslation } from "react-i18next";
const fontRubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

const rubik = fontRubik.className;

function ChatClient(props) {
  const { t } = useTranslation();
  function renderMessages(message, index) {
    return (
      <div
        key={index}
        className={`flex flex-col px-2 py-4 items-${
          message.sender === "AutoConnect" ? "start" : "end"
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
                  ? "left-[-8px]"
                  : "right-[-8px]"
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

  function handleSend(e) {
    e.preventDefault();
    props.sendMessage();
  }

  return (
    <div className="flex flex-col h-[300px] max-h-[300px]">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <div className="">{body}</div>
      </div>
      <div className="flex flex-row">
        <textarea
          className="resize-none mt-2 border border-gray-300 rounded p-2 w-3/4 mx-2"
          id="textbox"
          value={props.message}
          onChange={props.handleMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje"></textarea>
        <button
          className={`${rubik} text-s bg-naranja_enf w-[20vh] rounded px-2  text-white font-bold shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}
          onClick={handleSend}>
          {t("send")}
        </button>
      </div>
    </div>
  );
}
export default ChatClient;
