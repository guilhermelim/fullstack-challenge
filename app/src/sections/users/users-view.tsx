import CreateUser from "./view/create-user";
import ChartsPie from "./view/charts-pie";
import ListUser from "./view/list-user";
import { Box, Container, Stack } from "@mui/material";

import EditUser from "./view/edit-user";
import { UsersProvider } from "./context";

export default function UsersView() {
  return (
    <UsersProvider>
      <CreateUser />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
          >
            <ListUser />

            <ChartsPie />
          </Stack>
          <EditUser />
        </Box>
      </Container>
    </UsersProvider>
  );
}
