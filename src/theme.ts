import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c1c1c",
      paper: "#2c2c2c",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
