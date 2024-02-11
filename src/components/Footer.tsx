import { Container, Typography } from "@mui/material";
import { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      <Container sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <Typography variant="caption" textAlign="center">
          © 2021 Bank Account Manager
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
