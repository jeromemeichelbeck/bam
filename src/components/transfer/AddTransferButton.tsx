import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

type AddTransferButtonProps = {
  ownerId?: Owner["id"];
  accountId?: Account["id"];
};

const AddTransferButton: FC<AddTransferButtonProps> = ({
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
      href={`/transfer/add${searchParams ? `?${searchParams}` : ""}`}
      passHref
    >
      <Button variant="contained" color="primary">
        Make a new fund transfer{accountId ? " from this account" : ""}
      </Button>
    </Link>
  );
};

export default AddTransferButton;
