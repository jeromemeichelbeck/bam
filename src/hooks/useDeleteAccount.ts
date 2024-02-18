import { deleteAccount } from "@/services/api/account/deteteAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      router.push("/");
    },
  });

  return { mutate, isPending, error };
};
