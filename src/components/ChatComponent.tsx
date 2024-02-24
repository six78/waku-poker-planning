import { useEffect, useState } from "react";
import { RelayNode } from "@waku/sdk";
import { IDisplayMessage } from "../app.model";
import {
  utf8Decoder,
  utf8Encoder,
  wakuDecoder,
  wakuEncoder,
} from "./app.utils";

interface IProps {
  node: RelayNode;
}

export function ChatComponent({ node }: IProps) {
  const [messages, setMessages] = useState<IDisplayMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    node.relay.subscribe(wakuDecoder, (x) => {
      const message: IDisplayMessage = {
        message: utf8Decoder.decode(x.payload),
        sendedByMe: false,
      };
      console.log("MESSAGE RECEIVED", message);
      setMessages([...messages, message]);
    });
  }, []);

  const sendMessage = () => {
    node.relay
      .send(wakuEncoder, {
        payload: utf8Encoder.encode(inputMessage),
      })
      .then(() => {
        setInputMessage("");
        setMessages([
          ...messages,
          {
            message: inputMessage,
            sendedByMe: true,
          },
        ]);
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
            onChange={(e) => setInputMessage(e.target.value)}
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
