import { Button, Input, Space } from "antd";
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
    <Space.Compact block>
      <Input
        allowClear
        value={value}
        onChange={onChange}
        placeholder="Issue link or title"
      ></Input>
      <Button
        disabled={value.length === 0}
        loading={loading}
        type="primary"
        style={{ width: "4rem" }}
        onClick={onAdd}
      >
        {loading ? "" : "Add"}
      </Button>
    </Space.Compact>
  );
}
