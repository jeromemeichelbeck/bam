import { Container, Typography } from "@mui/material";
import { FC } from "react";

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  return (
    <header>
      <Container>
        <Typography variant="h1">Bank Account Manager</Typography>
      </Container>
    </header>
  );
};

export default Header;
