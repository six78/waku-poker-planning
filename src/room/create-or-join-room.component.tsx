import { useRef } from "react";
import { Button, Card, Col, Divider, Input, InputRef, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { generateHash } from "../shared/random-hash";
import { createEmptyRoom } from "../dealer/dealer-resolver";

export function CreateOrJoinRoom() {
  const input = useRef<InputRef>(null);
  const navigate = useNavigate();

  function createNewGame() {
    const roomId = generateHash();
    /**
     * TODO:
     * this is an ugly way to join the room as a host without passing the flag via url
     * try to find better solution
     */
    createEmptyRoom(roomId);
    navigate(`/room/${roomId}`);
  }

  function join() {
    const roomId = input.current?.input?.value.trim();
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  }

  return (
    <div className="w-scren h-screen flex justify-center items-center">
      <Card className="w-1/3">
        <div className="flex flex-col items-center">
          <Button onClick={createNewGame} type="primary" className="mt-4">
            Create new room as a dealer
          </Button>
          <Divider>or</Divider>
          <Row className="w-full">
            <Col span={18}>
              <Input
                className="flex-grow mr-2"
                ref={input}
                placeholder="Paste a room hash to join"
              ></Input>
            </Col>
            <Col span={5} offset={1}>
              <Button onClick={join} className="w-full" type="primary">
                Join
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
