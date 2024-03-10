import { Button, Input } from "antd";
import { useState } from "react";
import { IIssue } from "../../issue/issue.model";
import { createIssueFromString } from "../../issue/issue-parsing.service";

export function AddIssue(props: { addIssue: (issue: IIssue) => void }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setValue(e.target.value);
  }

  function onAdd(): void {
    setLoading(true);
    const issueName = value.trim();

    if (!issueName) {
      return;
    }

    createIssueFromString(issueName).then((x) => {
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
