export const deleteAccount = async (accountId: number) => {
  await fetch(`/api/accounts/${accountId}`, {
    method: "DELETE",
  });
};
