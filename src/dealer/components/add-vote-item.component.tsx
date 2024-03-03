import { Button, Input } from "antd";
import { IssueParsingService } from "../../issue/issue.service";
import { useState } from "react";
import { IVoteItem } from "../../voting/voting.model";

const parser = new IssueParsingService();

export function AddVoteItem(props: { addIssue: (issue: IVoteItem) => void }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setValue(e.target.value);
  }

  function onAdd(): void {
    setLoading(true);
    parser.createIssueFromString(value).then((x) => {
      console.log(x);
      setLoading(false);
      setValue("");
      props.addIssue(x);
    });
  }

  return (
    <div className="grid grid-rows-2 gap-4">
      <Input
        allowClear
        value={value}
        onChange={onChange}
        placeholder="Issue link or title"
        className="mb-3"
      ></Input>
      <Button
        disabled={value.length === 0}
        loading={loading}
        type="primary"
        className="justify-self-end"
        onClick={onAdd}
      >
        Add
      </Button>
    </div>
  );
}
