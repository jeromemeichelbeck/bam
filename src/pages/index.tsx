import AccountListContainer from "@/components/account/AccountListContainer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bank Account Manager</title>
        <meta name="description" content="A simple bank account manager" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AccountListContainer />
      </main>
    </>
  );
}
