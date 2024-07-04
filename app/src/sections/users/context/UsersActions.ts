import client, {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "@/utils/graphql";
import { User } from "../interface";
import { useState } from "react";

export const useUsersActions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUpdateUsersList = async () => {
    try {
      const response = await client.query({ query: getUsers });
      const newUsers = response.data.users;
      setUsers(newUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async ({
    firstName,
    lastName,
    participation,
  }: {
    firstName: string;
    lastName: string;
    participation: number;
  }) => {
    const newUser = {
      firstName,
      lastName,
      participation,
    };
    try {
      await client.mutate({
        mutation: addUser,
        variables: { input: newUser },
      });
      await handleUpdateUsersList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (deleteUserId: string) => {
    try {
      await client.mutate({
        mutation: deleteUser,
        variables: { deleteUserId },
      });
      await handleUpdateUsersList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (
    updateUserId: string,
    input: {
      firstName: string;
      lastName: string;
      participation: number;
    }
  ) => {
    try {
      await client.mutate({
        mutation: updateUser,
        variables: {
          updateUserId: updateUserId, // Passa o ID do usuário a ser atualizado
          input: {
            firstName: input.firstName,
            lastName: input.lastName,
            participation: input.participation,
          },
        },
      });
      await handleUpdateUsersList(); // Atualiza a lista após a atualização
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  const handleSave = async () => {
    if (selectedUser) {
      const updateUserId = selectedUser._id;
      const input = {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        participation: selectedUser.participation,
      };

      await handleUpdateUser(updateUserId, input);
      handleClose();
    }
  };

  const handleUpdateSelectedUser = (updatedUser: Partial<User>) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        ...updatedUser,
      });
    }
  };

  return {
    users,
    graphql: {
      handleAddUser,
      handleDeleteUser,
      handleUpdateUser,
      handleUpdateUsersList,
    },
    edit: {
      open,
      selectedUser,
      handleOpen,
      handleClose,
      handleSave,
      handleUpdateSelectedUser,
    },
  };
};
