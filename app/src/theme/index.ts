import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00b8e2",
      contrastText: "rgba(0,0,0,0.87)",
    },
    secondary: {
      main: "#2d52e3",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    info: {
      main: "#2196f3",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
