import { theme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
