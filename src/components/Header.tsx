import { Typography } from "@mui/material";
import { FC } from "react";

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  return (
    <header>
      <Typography variant="h1">Bank Account Manager</Typography>
    </header>
  );
};

export default Header;
