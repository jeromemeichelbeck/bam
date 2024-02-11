import { Container, Stack } from "@mui/material";
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
      <Container sx={{ flex: 1 }}>{children}</Container>
      <Footer />
    </Stack>
  );
};

export default Layout;
