import { useRouter } from "next/router";

export default function AccountDetails() {
  const router = useRouter();

  const accountId = parseInt(router.query.accountId as string);

  return <h1>Account details {accountId}</h1>;
}
