import { Container, Stack } from "@mui/material";
import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer />
      <Footer />
    </Stack>
  );
};

export default Layout;
