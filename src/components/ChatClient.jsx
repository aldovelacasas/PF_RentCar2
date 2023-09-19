function ChatClient(props) {
  console.log("propiedades cliente", props);
  function renderMessages(message, index) {
    console.log("miraaaaa", message);
    console.log(message);
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

  return (
    <div className="">
      <div className="">
        <div className="">{body}</div>
        <textarea
          className="resize-none"
          id="textbox"
          value={props.message}
          onChange={props.handleMessageChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje"></textarea>
      </div>
    </div>
  );
}
export default ChatClient;
