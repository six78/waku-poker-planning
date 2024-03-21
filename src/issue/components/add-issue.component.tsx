import { Button, Input, Space } from "antd";
import { useState } from "react";
import { IIssue } from "../issue.model";
import { createIssueFromString } from "../issue-parsing.service";

export function AddIssue(props: { addIssue: (issue: IIssue) => void }) {
  // TODO: display issue name
  const [value, setValue] = useState("");
  //  const [loading, setLoading] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setValue(e.target.value);
  }

  function onAdd(): void {
    //    setLoading(true);
    const issueName = value.trim();

    if (!issueName) {
      return;
    }

    setValue("");
    props.addIssue(createIssueFromString(issueName));

    //     createIssueFromString(issueName).then((x) => {
    // //      setLoading(false);

    //     });
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
        //loading={loading}
        type="primary"
        style={{ width: "4rem" }}
        onClick={onAdd}
      >
        {/* {loading ? "" : "Add"} */} Add
      </Button>
    </Space.Compact>
  );
}
