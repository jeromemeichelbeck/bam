import { AccountFormDTO, accountFormSchema } from "@/schemas/account";
import { addAccount } from "@/services/api/account/addAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useAddAccountForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AccountFormDTO>({
    resolver: zodResolver(accountFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addAccount,
    // throwOnError: false,
    onSuccess: () => {
      // Notify the user that the account was added
      toast.success("Account added successfully");
      // Invalidate the query to ensure we get the new data from the server
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // Redirect to the accounts page
      router.push("/");
    },
    onError: (error) => {
      setError("root", { message: error.message });
    },
  });

  const handleAddAccount = handleSubmit(async (data) => {
    mutate(data);
  });

  return { isPending, control, register, errors, handleAddAccount };
};
