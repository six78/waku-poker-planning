import { ReactNode } from "react";
import { getUserDataFromLocalStorage } from "./current-user";
import { Navigate, useParams } from "react-router-dom";
import { REDIRECT_TO_ROOM_URL_PARAM } from "../app/app.router";

export function AuthorizedUserGuard(props: { children: ReactNode }) {
  const { id: roomId } = useParams();
  const user = getUserDataFromLocalStorage();

  if (!user) {
    return (
      <Navigate to={`/register-user?${REDIRECT_TO_ROOM_URL_PARAM}=${roomId}`} />
    );
  }

  return <h1>{props.children}</h1>;
}
