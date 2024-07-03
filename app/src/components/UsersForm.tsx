import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import FormProvider, { RHFTextField } from "@/components/hook-form";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const defaultValues = {
  firstName: "",
  lastName: "",
  participation: 100,
};

const validationSchema = yup.object({
  firstName: yup.string().required("The `firstName` field is required."),
  lastName: yup.string().required("The `lastName` field is required."),
  participation: yup
    .number()
    .required("The `participation` field is required.")
    .positive("The `participation` field is required.")
    .integer(),
});

export default function UsersForm() {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  });

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = (values: any) => {
    console.log("values: ", values);
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
