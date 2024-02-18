import { Container, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
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
      <Container sx={{ flex: 1, padding: 4 }}>{children}</Container>
      <ToastContainer />
      <Footer />
    </Stack>
  );
};

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic
export default dynamic(() => Promise.resolve(Layout), { ssr: false });
