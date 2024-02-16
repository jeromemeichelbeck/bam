import { TransfertFormDTO, transfertFormSchema } from "@/schemas/transfert";
import { addTransfert } from "@/services/api/transferts/addTransfert";
import { Account } from "@/types/account";
import { Owner } from "@/types/owner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    mode: "onChange",
    resolver: zodResolver(transfertFormSchema),
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
