import { Transfer } from "@/types/transfer";
import { getOneAccountById } from "../accounts/getOneAccountById";
import { updateAccount } from "../accounts/updateAccount";
import { getOneRate } from "../rates/getOneRate";
import { saveEntities } from "../shared/saveEntities";
import { getAllTransfers } from "./getAllTranfert";

type TranfertDTO = Pick<
  Transfer,
  "fromAccountId" | "toAccountId" | "amount" | "description"
>;

export const addTransfer = async (transfer: TranfertDTO) => {
  const [fromAccount, toAccount] = await Promise.all([
    getOneAccountById(transfer.fromAccountId),
    getOneAccountById(transfer.toAccountId),
  ]);

  if (!fromAccount) {
    throw new Error("The source account does not exist");
  }
  if (!toAccount) {
    throw new Error("The destination account does not exist");
  }

  const rate = await getOneRate(fromAccount.currency, toAccount.currency);

  const transfers = await getAllTransfers();

  const toAmount = Math.round(transfer.amount * rate);

  try {
    // We won't check the balance on backend because it is out of scope
    updateAccount(fromAccount.id, {
      balance: fromAccount.balance - transfer.amount,
    });
  } catch (error) {
    throw new Error(
      "An error occured while trying to update the source account",
    );
  }
  try {
    updateAccount(toAccount.id, {
      balance: toAccount.balance + toAmount,
    });
  } catch (error) {
    throw new Error(
      "An error occured while trying to update the destination account",
    );
  }

  const id = transfers.length < 1 ? 1 : transfers[transfers.length - 1].id + 1;

  const date = new Date().toISOString();

  const newTransfer = {
    ...transfer,
    id,
    date,
    fromAccountName: fromAccount.name,
    currency: fromAccount.currency,
    toAmount,
    toCurrency: toAccount.currency,
    toAccountName: toAccount.name,
    rate,
  };

  transfers.push(newTransfer);

  await saveEntities(transfers, "transfers");

  return newTransfer;
};
