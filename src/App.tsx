import { useEffect, useState } from "react";
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder, RelayNode } from "@waku/sdk";
import "./App.css";

const CONTENT_TOPIC = "/six78/1/helloworld/json";
const PUBSUB_TOPIC = "/waku/2/default-waku/proto";
const utf8Encode = new TextEncoder();

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages] = useState([]);

  // Create and start a Light Node
  const { node, error, isLoading } = useWaku<RelayNode>();

  const encoder = createEncoder({
    contentTopic: CONTENT_TOPIC,
    pubsubTopic: PUBSUB_TOPIC,
  });

  const decoder = createDecoder(CONTENT_TOPIC, PUBSUB_TOPIC);

  useEffect(() => {
    console.log(node, error, isLoading);

    if (node) {
      console.log(node);

      node.start().then(() => {
        console.log("node started", node.libp2p.peerId.toString());

        setInterval(() => {
          console.log(node.relay.getMeshPeers(CONTENT_TOPIC)), CONTENT_TOPIC;
        }, 10 * 1000);
        setInterval(() => {
          console.log(node.relay.getMeshPeers(PUBSUB_TOPIC)), PUBSUB_TOPIC;
        }, 10 * 1000);

        node.relay
          .send(encoder, {
            payload: utf8Encode.encode("hello from Buenos Aires"),
          })
          .then((x) => console.log(x));

        console.log("listener started");

        node.relay.subscribe(decoder, (x) => console.log(x));
      });
    }
  }, [node, error, isLoading]);

  // Update the inputMessage state as the user input changes
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {};

  return (
    <>
      <div className="chat-interface">
        <h1>Waku React Demo</h1>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <span>{new Date(message.timestamp).toUTCString()}</span>
              <div className="message-text">{message.message}</div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            id="message-input"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
