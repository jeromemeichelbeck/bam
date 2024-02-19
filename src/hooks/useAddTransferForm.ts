import { TransferFormDTO, transferFormSchema } from "@/schemas/transfer";
import { addTransfer } from "@/services/api/transfer/addTransfer";
import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useAddTransferForm = (
  ownerId?: Owner["id"],
  accountId?: Account["id"],
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    ...form
  } = useForm<TransferFormDTO>({
    defaultValues: {
      fromOwnerId: undefined,
      fromAccountId: undefined,
      toOwnerId: undefined,
      toAccountId: undefined,
      amount: undefined,
      description: "",
    },
    mode: "onChange",
    resolver: zodResolver(transferFormSchema),
  });

  // Change default values when ownerId or accountId are provided
  useEffect(() => {
    if (ownerId) {
      setValue("fromOwnerId", ownerId, { shouldTouch: true });
    }
    if (accountId) {
      setValue("fromAccountId", accountId, { shouldTouch: true });
    }
  }, [ownerId, accountId, setValue]);

  const { mutate, ...mutation } = useMutation({
    mutationFn: addTransfer,
    onSuccess: () => {
      toast.success("Transfer done successfully");

      queryClient.invalidateQueries({ queryKey: ["transfers"] });

      if (accountId) {
        router.push(`/account/${accountId}`);
      }

      router.push("/");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const handleAddTransfer = handleSubmit(async (data) => {
    mutate(data);
  });

  return {
    ...form,
    ...mutation,
    values: watch(),
    errors,
    handleAddTransfer,
  };
};
