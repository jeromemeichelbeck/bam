import { useGetOneAccount } from "@/hooks/useGetOneAccount";
import { useGetOneOwner } from "@/hooks/useGetOneOwner";
import { TransferFormDTO } from "@/schemas/transfer";
import { Control } from "react-hook-form";

export const useTransferSummary = (control: Control<TransferFormDTO>) => {
  const {
    fromOwnerId,
    fromAccountId,
    toOwnerId,
    toAccountId,
    amount,
    description,
  } = control._getWatch();

  const { data: fromOwner } = useGetOneOwner(fromOwnerId);
  const { data: fromAccount } = useGetOneAccount(fromAccountId);
  const { data: toOwner } = useGetOneOwner(toOwnerId);
  const { data: toAccount } = useGetOneAccount(toAccountId);

  return {
    fromOwner,
    fromAccount,
    toOwner,
    toAccount,
    amount,
    description,
  };
};
