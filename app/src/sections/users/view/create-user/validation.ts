import * as yup from "yup";
export const defaultValues = {
  firstName: "",
  lastName: "",
  participation: 100,
};

export const validationSchema = yup.object({
  firstName: yup.string().required("The `firstName` field is required."),
  lastName: yup.string().required("The `lastName` field is required."),
  participation: yup
    .number()
    .required("The `participation` field is required.")
    .positive("The `participation` field is required.")
    .integer(),
});
