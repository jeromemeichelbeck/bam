import {
  UpdateAccountFormDTO,
  updateAccountFormSchema,
} from "@/schemas/account";
import { updateAccount } from "@/services/api/account/updateAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useEditAccountForm = (
  { id, name }: UpdateAccountFormDTO,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateAccountFormDTO>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(updateAccountFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["account", { accountId: id }],
      });
      onSuccess();
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const handleEditAccount = handleSubmit(async (data) => {
    mutate({ ...data, id });
  });

  return { isPending, control, errors, handleEditAccount };
};
