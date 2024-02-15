import { Transfert } from "@/types/transfert";
import { getOneAccountById } from "../accounts/getOneAccountById";
import { updateAccount } from "../accounts/updateAccount";
import { getOneRate } from "../rates/getOneRate";
import { saveEntities } from "../shared/saveEntities";
import { getAllTransferts } from "./getAllTranferts";

type TranfertDTO = Omit<
  Transfert,
  "id" | "date" | "currency" | "toAmount" | "toCurrency" | "rate"
>;

export const addTransfert = async (transfert: TranfertDTO) => {
  const [fromAccount, toAccount] = await Promise.all([
    getOneAccountById(transfert.fromAccountId),
    getOneAccountById(transfert.toAccountId),
  ]);

  if (!fromAccount) {
    throw new Error("The source account does not exist");
  }
  if (!toAccount) {
    throw new Error("The destination account does not exist");
  }

  const rate = await getOneRate(fromAccount.currency, toAccount.currency);

  const transferts = await getAllTransferts();

  const toAmount = Math.round(transfert.amount * rate);

  try {
    // We won't check the balance on backend because it is out of scope
    updateAccount(fromAccount.id, {
      balance: fromAccount.balance - transfert.amount,
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

  const id =
    transferts.length < 1 ? 1 : transferts[transferts.length - 1].id + 1;

  const date = new Date().toISOString();

  const newTransfert = {
    ...transfert,
    id,
    date,
    currency: fromAccount.currency,
    toAmount,
    toCurrency: toAccount.currency,
    rate,
  };

  transferts.push(newTransfert);

  await saveEntities(transferts, "transferts");

  return newTransfert;
};
