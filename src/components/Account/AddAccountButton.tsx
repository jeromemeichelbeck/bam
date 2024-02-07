import { Button } from "@mui/material";
import { FC } from "react";

type AddAccountButtonProps = {};

const AddAccountButton: FC<AddAccountButtonProps> = () => {
  return (
    <Button variant="contained" color="primary">
      Add Account
    </Button>
  );
};

export default AddAccountButton;
