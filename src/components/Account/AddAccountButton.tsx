import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

type AddAccountButtonProps = {};

const AddAccountButton: FC<AddAccountButtonProps> = () => {
  return (
    <Link href="/account/add" passHref>
      <Button variant="contained" color="primary">
        Add Account
      </Button>
    </Link>
  );
};

export default AddAccountButton;
