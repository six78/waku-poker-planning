import { ReactNode } from "react";
import { getUserDataFromLocalStorage } from "./current-user";
import { Navigate } from "react-router-dom";

export function AuthorizedUserGuard(props: { children: ReactNode }) {
  const user = getUserDataFromLocalStorage();

  if (!user) {
    return <Navigate to="/register-user" />;
  }

  return <h1>{props.children}</h1>;
}
