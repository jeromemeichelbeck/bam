import AccountDetails from "@/components/account/AccountDetails";
import { Button, Stack } from "@mui/material";
import ErrorPage from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AccountDetailsPage() {
  const router = useRouter();

  const accountId = router.query.accountId
    ? parseInt(router.query.accountId as string)
    : undefined;

  if (!accountId || isNaN(accountId)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Stack spacing={2}>
      <Link href="/" passHref>
        <Button variant="text" color="primary">
          Go back to accounts list
        </Button>
      </Link>
      <AccountDetails accountId={accountId} />
    </Stack>
  );
}
