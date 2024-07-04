import React, { PropsWithChildren } from "react";
import { UsersContext } from "./UsersContext";
import { useUsersActions } from "./UsersActions";

export const UsersProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const usersActions = useUsersActions();

  return (
    <UsersContext.Provider value={usersActions}>
      {children}
    </UsersContext.Provider>
  );
};
