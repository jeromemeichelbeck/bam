import { theme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { AppProps } from "next/app";
import { FC } from "react";

type MuiProviderProps = AppProps & {
  children: React.ReactNode;
};

const MuiProvider: FC<MuiProviderProps> = ({ children, ...props }) => {
  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default MuiProvider;
