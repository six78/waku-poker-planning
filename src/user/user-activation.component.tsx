import { useEffect, useRef, useState } from "react";
import { UserActivationService } from "./current-user.service";
import { StyleProvider } from "@ant-design/cssinjs";
import { Button, Card, Input, InputRef } from "antd";
import { AppInitializer } from "../app/app-initializer.component";

function normalizeUserName(name: string): string {
  return name.trim();
}

function isValidUserName(name: string): boolean {
  return name.length > 0;
}

function RegisterUser(props: {
  onUserNameEntered: (userName: string) => void;
}) {
  const input = useRef<InputRef>(null);

  function submit() {
    const userName = normalizeUserName(input.current?.input?.value || "");
    if (isValidUserName(userName)) {
      props.onUserNameEntered(userName);
    }
  }

  return (
    <div className="w-scren h-screen flex justify-center items-center">
      <Card title="Enter your name to continue" className="w-1/3">
        <div className="flex flex-col items-end">
          <Input ref={input} placeholder="name"></Input>
          <Button onClick={submit} type="primary" className="mt-4">
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function UserActivation() {
  // TODO: Ульяна
  const userService = useRef(new UserActivationService());
  const [isUserExists, setIsUserExists] = useState(false);

  useEffect(() => {
    setIsUserExists(userService.current.isUserExists);
  }, []);

  function onUserNameEntered(name: string): void {
    userService.current.saveUser(name);
    setIsUserExists(true);
  }

  return (
    <StyleProvider hashPriority="high">
      {isUserExists ? (
        <AppInitializer />
      ) : (
        <RegisterUser onUserNameEntered={onUserNameEntered} />
      )}
    </StyleProvider>
  );
}
