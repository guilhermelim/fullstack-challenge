import { createContext, useContext } from "react";
import { User } from "../interface";

interface UsersContextProps {
  users: User[];
  graphql: {
    handleAddUser: (newUser: {
      firstName: string;
      lastName: string;
      participation: number;
    }) => Promise<void>;
    handleDeleteUser: (deleteUserId: string) => Promise<void>;
    handleUpdateUser: (
      updateUserId: string,
      input: { firstName: string; lastName: string; participation: number }
    ) => Promise<void>;
    handleUpdateUsersList: () => Promise<void>;
  };
  edit: {
    open: boolean;
    selectedUser: User | null;
    handleOpen: (user: User) => void;
    handleClose: () => void;
    handleSave: () => Promise<void>;
    handleUpdateSelectedUser: (updatedUser: Partial<User>) => void;
  };
}

export const UsersContext = createContext<UsersContextProps | undefined>(
  undefined
);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
