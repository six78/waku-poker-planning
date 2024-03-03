import { Button, Form, Input, Modal, Switch } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useFormService } from "../shared/form/form.service";
import { AppContext } from "../app/app.context";

interface ISettings {
  playersName: string;
  isDealer: boolean;
}

export function Header() {
  const appContext = useContext(AppContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formService = useFormService<ISettings>({
    initialValue: {
      isDealer: appContext.userService.isDealer,
      playersName: appContext.userService.name,
    },
    onFinish: (changes) => {
      if (changes) {
        appContext.userService.update({
          id: appContext.userService.id,
          name: changes.playersName || appContext.userService.name,
          isDealer:
            changes.isDealer === undefined
              ? appContext.userService.isDealer
              : changes.isDealer,
        });
      }
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
