import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

type AddTransfertButtonProps = {
  ownerId?: Owner["id"];
  accountId?: Account["id"];
};

const AddTransfertButton: FC<AddTransfertButtonProps> = ({
  ownerId,
  accountId,
}) => {
  const searchParams = new URLSearchParams();
  if (ownerId) {
    searchParams.append("ownerId", ownerId.toString());
  }
  if (accountId) {
    searchParams.append("accountId", accountId.toString());
  }

  return (
    <Link
      href={`/transfert/add${searchParams ? `?${searchParams}` : ""}`}
      passHref
    >
      <Button variant="contained" color="primary">
        Make a new fund transfert{accountId ? " from this account" : ""}
      </Button>
    </Link>
  );
};

export default AddTransfertButton;
