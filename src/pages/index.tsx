import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function Home() {
  const { data: accounts, isLoading: isAccountsLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await fetch("/api/accounts");
      const data = await response.json();
      return data;
    },
  });
  return (
    <>
      <Head>
        <title>Bank Account Manager</title>
        <meta name="description" content="A simple bank account manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Typography variant="h1">Bank Account Manager</Typography>
        {isAccountsLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <ul>
            {accounts.map((account: any) => (
              <li key={account.id}>
                <Typography variant="body1">{account.name}</Typography>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
