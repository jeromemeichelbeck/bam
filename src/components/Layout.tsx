import { Box, Stack } from "@mui/material";
import { FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Stack>
  );
};

export default Layout;
