import { Button, Form, Input, Modal, Switch } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { useState } from "react";
import { useFormService } from "../shared/form/form.service";

interface ISettings {
  playersName: string;
  isDealer: boolean;
}

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formService = useFormService<ISettings>({
    initialValue: {
      isDealer: true,
      playersName: "Дидух",
    },
    onFinish: (changes) => {
      console.log(changes);
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
      <div className="w-full h-full px-4 bg-white flex items-center justify-end">
        <Button onClick={() => setIsModalOpen(true)} icon={<SettingFilled />} />
      </div>

      <Modal
        title="Settings"
        open={isModalOpen}
        onOk={() => formService.instance.submit()}
        onCancel={() => close()}
      >
        <Form
          layout="vertical"
          form={formService.instance}
          onFinish={formService.onFinish}
        >
          <Form.Item name="playersName" label="Player's Name">
            <Input />
          </Form.Item>
          <Form.Item name="isDealer" label="Is Dealer" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
