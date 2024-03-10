import { Button, Modal, Space } from "antd";
import { IPlayer, PlayerId, PlayerName } from "../player/player.model";
import { PlayerTag } from "../player/players-list.component";
import { generateHash } from "../shared/random-hash";
import { VoteOption } from "./vote-option.component";
import {
  IVoteResult,
  NO_VOTE_LABEL,
  VoteValue,
  VoteValueOrNoVote,
} from "./voting.model";
import { useState } from "react";
import { useDealer } from "../dealer/dealer.context";
import {
  useOnlinePlayersList as useOnlinePlayersList,
  useVoting,
} from "../app/app.state";

const MOCK = false;

function calculateResults(
  players: IPlayer[],
  votes: { [key: PlayerId]: VoteValue }
): IVoteResult {
  if (MOCK) {
    return calculateResultsMocked(players, votes);
  }

  return players.reduce((result: IVoteResult, player) => {
    const vote = votes[player.id] || NO_VOTE_LABEL;
    if (!result[vote]) {
      result[vote] = [];
    }
    result[vote]!.push(player.name);
    return result;
  }, {} as IVoteResult);
}

function calculateResultsMocked(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _players: IPlayer[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _votes: { [key: PlayerId]: VoteValue }
): IVoteResult {
  return {
    "8": [
      generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash() + generateHash() + generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
      generateHash(),
    ],
    "13": ["dsfgsdfg", "alsdsa", "asdasd", "sdasdasd"],
    [NO_VOTE_LABEL]: ["sdfgsdfg"],
  };
}

export function VoteResult(props: {
  revote: () => void;
  submit: (value: VoteValue) => void;
}) {
  const [players] = useOnlinePlayersList();
  const [voting] = useVoting();
  const results = voting.results;
  const [result, setResult] = useState<VoteValue | null>(null);
  const dealer = useDealer();

  if (!results) {
    // TODO:
    throw new Error("");
  }

  function handleVoteClick(vote: VoteValueOrNoVote): void {
    if (!dealer || vote === NO_VOTE_LABEL) {
      return;
    }

    setResult(result !== vote ? vote : null);
  }

  function handleRevoteClick(): void {
    props.revote();
  }

  const votes = calculateResults(players, results);
  console.log(votes);

  return (
    <Modal
      title="Vote results"
      open={true}
      closable={false}
      footer={
        <Space>
          {dealer && <Button onClick={handleRevoteClick}>Revote</Button>}
          <Button
            type="primary"
            disabled={!result}
            onClick={() => props.submit(result!)}
          >
            Submit
          </Button>
        </Space>
      }
    >
      {Object.entries(votes).map((entry) => {
        const vote = entry[0] as VoteValueOrNoVote;
        const players = entry[1] as PlayerName[];

        return (
          <div key={vote} className="flex items-center mb-4">
            <VoteOption
              className="flex-shrink-0"
              active={vote === result}
              key={vote}
              onClick={handleVoteClick.bind(undefined, vote)}
              showLoader={false}
            >
              {vote}
            </VoteOption>
            <div className="ml-4">
              <Space wrap={true}>
                {players.map((player) => (
                  <PlayerTag key={player} color="blue">
                    {player}
                  </PlayerTag>
                ))}
              </Space>
            </div>
          </div>
        );
      })}
    </Modal>
  );
}
