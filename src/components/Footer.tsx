import { Box, Typography } from "@mui/material";
import { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      <Box py={2} display="flex" justifyContent="center">
        <Typography variant="caption" textAlign="center">
          © 2021 Bank Account Manager
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
