import { Table, TableProps } from "antd";
import { getDealerRooms } from "../dealer/dealer-resolver";
import { RoomId } from "./room.model";
import { Button } from "antd";
import { useNavigateToRoom } from "../app/app.router";
import { appConfig } from "../app/app.config";

interface IData {
  key: string;
  roomId: RoomId;
  updatedAt: string;
  issues: string;
}

function getLastFiveRoomsData(): IData[] {
  const rooms = getDealerRooms();

  return Object.keys(rooms)
    .map((roomId) => {
      const data = rooms[roomId];

      return {
        roomId,
        key: roomId,
        updatedAt: data.updatedAt,
        issues: `${data.issues.filter((x) => x.result).length}/${
          data.issues.length
        }`,
      };
    })
    .sort((x, y) => {
      return x.updatedAt - y.updatedAt;
    })
    .filter((_, i) => i <= appConfig.maxRoomsToDisplay - 1)
    .map((data) => {
      return {
        ...data,
        updatedAt: new Date(data.updatedAt).toLocaleDateString(),
      };
    });
}

export function RoomsList() {
  const navigateToRoom = useNavigateToRoom();
  const rooms = getLastFiveRoomsData();

  if (!rooms.length) {
    return null;
  }

  function onRoomClick(roomId: RoomId) {
    navigateToRoom(roomId);
  }

  const columns: TableProps<IData>["columns"] = [
    {
      title: "Last usage",
      dataIndex: "updatedAt",
    },
    {
      title: "Issues",
      dataIndex: "issues",
    },
    {
      title: "Action",
      dataIndex: "roomId",
      render: (roomId) => (
        <Button onClick={onRoomClick.bind(undefined, roomId)}>Open</Button>
      ),
    },
  ];

  return (
    <Table
      className="w-full"
      pagination={false}
      dataSource={rooms}
      columns={columns}
    />
  );
}
