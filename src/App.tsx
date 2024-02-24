import { useWaku } from "@waku/react";
import { RelayNode } from "@waku/sdk";
import "./App.css";
import { ChatComponent } from "./components/ChatComponent";

function App() {
  const { node } = useWaku<RelayNode>();
  return node ? <ChatComponent node={node} /> : <></>;
}

export default App;
