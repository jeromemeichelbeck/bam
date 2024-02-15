import { TransfertFormDTO, transfertFormSchema } from "@/schemas/transfert";
import { addTransfert } from "@/services/api/transferts/addTransfert";
import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useAddTransfertForm = (
  ownerId?: Owner["id"],
  accountId?: Account["id"],
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    ...form
  } = useForm<TransfertFormDTO>({
    defaultValues: {
      fromOwnerId: undefined,
      fromAccountId: undefined,
      toOwnerId: undefined,
      toAccountId: undefined,
      amount: 0,
      description: "",
    },
    resolver: zodResolver(transfertFormSchema),
  });

  if (ownerId) {
    setValue("fromOwnerId", ownerId);
  }

  if (accountId) {
    setValue("fromAccountId", accountId);
  }

  const { mutate, ...mutation } = useMutation({
    mutationFn: addTransfert,
    onSuccess: () => {
      toast.success("Transfert done successfully");

      queryClient.invalidateQueries({ queryKey: ["transferts"] });

      if (accountId) {
        router.push(`/account/${accountId}`);
      }

      router.push("/");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const handleAddTransfert = handleSubmit(async (data) => {
    mutate(data);
  });

  return {
    ...form,
    ...mutation,
    errors,
    handleAddTransfert,
  };
};
