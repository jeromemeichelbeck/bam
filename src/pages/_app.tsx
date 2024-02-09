import Layout from "@/components/Layout";
import MuiProvider from "@/services/providers/MuiProvider";
import QueryProvider from "@/services/providers/QueryProvider";
import type { AppProps } from "next/app";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MuiProvider {...props}>
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryProvider>
    </MuiProvider>
  );
}
