import { AccountFormDTO, accountFormSchema } from "@/schemas/account";
import { addAccount } from "@/services/api/account/addAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAddAccountForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormDTO>({
    resolver: zodResolver(accountFormSchema),
  });

  const handleAddAccount = handleSubmit(async (data) => {
    await addAccount(data);
  });

  return { control, register, errors, handleAddAccount };
};
