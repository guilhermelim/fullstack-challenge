import CreateUser from "./view/create-user";
import ChartsPie from "./view/charts-pie";
import ListUser from "./view/list-user";
import { Box, Container, Stack, Typography } from "@mui/material";

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
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            Fullstack Challenge
          </Typography>

          <Typography
            variant="subtitle1"
            component="body"
            align="center"
            sx={{ mb: 2 }}
          >
            This is a project that offers a quick start with a GraphQL API and
            an integrated front-end.
          </Typography>

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
