import AccountDetailContainer from "@/components/account/AccountDetailContainer";
import { LinearProgress } from "@mui/material";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

export default function AccountDetailsPage() {
  const router = useRouter();

  const accountId = router.query.accountId
    ? parseInt(router.query.accountId as string)
    : undefined;

  if (!accountId) {
    return <LinearProgress />;
  }

  if (isNaN(accountId)) {
    return <ErrorPage statusCode={404} />;
  }

  return <AccountDetailContainer accountId={accountId} />;
}
