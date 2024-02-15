import { TransfertFormDTO, transfertFormSchema } from "@/schemas/transfert";
import { addTransfert } from "@/services/api/transferts/addTransfert";
import { Account } from "@/types/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useAddTransfertForm = (accountId?: Account["id"]) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TransfertFormDTO>({
    resolver: zodResolver(transfertFormSchema),
  });

  const { mutate, isPending } = useMutation({
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

  return { isPending, control, register, errors, handleAddTransfert };
};
