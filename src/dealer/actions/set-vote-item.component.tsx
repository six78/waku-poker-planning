import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useFormService } from "../../shared/form/form.service";
import { generateGuid } from "../../shared/guid";
import { useDealer } from "../dealer.context";

interface IVoteItemModel {
  title: string;
}

export function SetVoteItem() {
  const dealer = useDealer()!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formService = useFormService<IVoteItemModel>({
    initialValue: {
      title: "",
    },
    onFinish: (changes) => {
      if (!changes) {
        return;
      }

      dealer.startVoting({
        id: generateGuid(),
        name: changes.title!,
      });
    },
  });

  function close() {
    setIsModalOpen(false);
    formService?.reset();
  }

  if (!formService) {
    return <></>;
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Set vote item</Button>

      <Modal
        title="Set vote item"
        open={isModalOpen}
        onOk={() => formService.instance.submit()}
        onCancel={() => close()}
      >
        <Form
          layout="vertical"
          form={formService.instance}
          onFinish={formService.onFinish}
        >
          <Form.Item name="title" label="Vote item title">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
