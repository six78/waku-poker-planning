import { Button, Form, Input, Modal } from "antd";
import { useContext, useState } from "react";
import { useFormService } from "../../shared/form/form.service";
import { DealerContext, useDealerContext } from "../dealer.context";
import { generateGuid } from "../../shared/guid";

interface IVoteItemSettings {
  title: string;
}

export function SetVoteItem() {
  const dealerService = useDealerContext()!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formService = useFormService<IVoteItemSettings>({
    initialValue: {
      title: "",
    },
    onFinish: (changes) => {
      if (!changes) {
        return;
      }

      dealerService.setVoteItem({
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
