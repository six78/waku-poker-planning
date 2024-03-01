import { Card } from "antd";

export function DeckControlPanel() {
  return (
    <div className="h-full grid grid-raws-2 gap-4">
      <Card>
        <p>Тут будет панелька для игрока</p>
      </Card>

      <Card>
        <p>Тут будет панелька для дилера</p>
      </Card>
    </div>
  );
}
