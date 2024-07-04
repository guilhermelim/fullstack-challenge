import { AppBar, Box, Toolbar, Container, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import FormProvider, { RHFTextField } from "@/components/hook-form";
import { defaultValues, validationSchema } from "./validation";
import { useUsers } from "../../context/UsersContext";

export default function CreateUser() {
  const { graphql } = useUsers();

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (values: any) => {
    graphql.handleAddUser(values);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ m: 4 }}>
          <Container maxWidth="lg">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <RHFTextField
                  name={`firstName`}
                  InputLabelProps={{ shrink: true }}
                  label="First name"
                  variant="filled"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                />
                <RHFTextField
                  name={`lastName`}
                  InputLabelProps={{ shrink: true }}
                  label="Last name"
                  variant="filled"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                />
                <RHFTextField
                  name={`participation`}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  label="Participation"
                  variant="filled"
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                />

                <Box textAlign="center">
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 2,
                      px: 5,
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "1px solid #000000", // Adiciona uma borda preta
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        color: "#000000",
                      },
                    }}
                  >
                    SEND
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
