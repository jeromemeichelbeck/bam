import AccountDetails from "@/components/account/AccountDetails";
import { useRouter } from "next/router";

export default function AccountDetailsPage() {
  const router = useRouter();

  const accountId = parseInt(router.query.accountId as string);

  return <AccountDetails accountId={accountId} />;
}
