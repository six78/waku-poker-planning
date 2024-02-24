import { KeyboardEventHandler, useEffect, useState } from "react";
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder, RelayNode } from "@waku/sdk";
import "./App.css";

const CONTENT_TOPIC = "/six78/1/helloworld/json";
const PUBSUB_TOPIC = "/waku/2/default-waku/proto";
const utf8Encode = new TextEncoder();
const utf8Decode = new TextDecoder();

interface IDisplayMessage {
  message: string;
  sendedByMe: boolean;
}

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<IDisplayMessage[]>([]);

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
          console.log(node.relay.getMeshPeers(PUBSUB_TOPIC)), PUBSUB_TOPIC;
        }, 10 * 1000);

        node.relay
          .send(encoder, {
            payload: utf8Encode.encode("hello from Buenos Aires"),
          })
          .then((x) => console.log(x));

        console.log("listener started");

        node.relay.subscribe(decoder, (x) => {
          const message: IDisplayMessage = {
            message: utf8Decode.decode(x.payload),
            sendedByMe: false,
          };
          console.log("MESSAGE RECEIVED", message);
          setMessages([...messages, message]);
        });
      });
    }
  }, [node, error, isLoading]);

  // Update the inputMessage state as the user input changes
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log("sending...", inputMessage);

    node?.relay
      .send(encoder, {
        payload: utf8Encode.encode(inputMessage),
      })
      .then(() => {
        const message: IDisplayMessage = {
          message: inputMessage,
          sendedByMe: true,
        };

        setMessages([...messages, message]);
        setInputMessage("");
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleKeyDown(event: any) {
    if (event.code === "Enter") {
      sendMessage();
    }
  }

  return (
    <>
      <div className="chat-interface">
        <h1>Waku React Demo</h1>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className="chat-message">
              <div
                className={
                  "message-text " + (message.sendedByMe ? "right-side" : "")
                }
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            id="message-input"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
