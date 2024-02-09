import { AccountFormDTO, accountFormSchema } from "@/schemas/account";
import { addAccount } from "@/services/api/account/addAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useAddAccountForm = () => {
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormDTO>({
    resolver: zodResolver(accountFormSchema),
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (data: AccountFormDTO) => {
      await addAccount(data);
    },
    onSuccess: () => {
      // Invalidate the query to ensure we get the new data from the server
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const handleAddAccount = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return { isPending, control, register, errors, handleAddAccount };
};
