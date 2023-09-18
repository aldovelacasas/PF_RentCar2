function ChatClient(props) {
  console.log("propiedades cliente", props);
  function renderMessages(message, index) {
    console.log("miraaaaa", message);
    console.log(message);
    return (
      <div key={index}>
        <div>
          <h4>{message.sender}</h4>
        </div>
        <div>
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  let body;

  body = <div name="messages">{props.messages?.map(renderMessages)}</div>;

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault(), props.sendMessage();
    }
  }

  return (
    <div name="container">
      <div name="chatPanel">
        <div name="bodyContainer">{body}</div>
        <textarea
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
