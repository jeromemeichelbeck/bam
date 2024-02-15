import AccountDetails from "@/components/account/AccountDetails";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

export default function AccountDetailsPage() {
  const router = useRouter();

  const accountId = router.query.accountId
    ? parseInt(router.query.accountId as string)
    : undefined;

  if (!accountId || isNaN(accountId)) {
    return <ErrorPage statusCode={404} />;
  }

  return <AccountDetails accountId={accountId} />;
}
