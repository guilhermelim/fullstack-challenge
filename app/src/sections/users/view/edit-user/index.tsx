import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import { useUsers } from "../../context/UsersContext";

export default function EditUser() {
  const { edit } = useUsers();

  return (
    <Modal
      open={edit.open}
      onClose={edit.handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Edit User
        </Typography>
        <TextField
          label="First Name"
          value={edit.selectedUser?.firstName || ""}
          onChange={(e) =>
            edit.handleUpdateSelectedUser({
              ...edit.selectedUser!,
              firstName: e.target.value,
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={edit.selectedUser?.lastName || ""}
          onChange={(e) =>
            edit.handleUpdateSelectedUser({
              ...edit.selectedUser!,
              lastName: e.target.value,
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Participation"
          type="number"
          value={edit.selectedUser?.participation || 0}
          onChange={(e) =>
            edit.handleUpdateSelectedUser({
              ...edit.selectedUser!,
              participation: parseInt(e.target.value, 10),
            })
          }
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={edit.handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}
