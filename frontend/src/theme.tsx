import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";
export default createTheme({
  palette: {
    primary: {
      main: "#134074",
    },
    secondary: {
      main: "#e2eafc",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: ["Calibri", "BlinkMacSystemFont", '"Segoe UI"', "Roboto"].join(
      ",",
    ),
    button: {
      fontWeight: 700,
    },
  },
});
