import type { AppProps } from "next/app"

import Head from "next/head"

import styled from "styled-components"

function MyApp({ Component, pageProps }: AppProps) {
  const { slugCollection } = pageProps
  // byggs varje gång App renderas. Men det känns ok.

  return (
    <>
      <Head>
        <title>Songs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Regnsbagsfonden" content="Regnsbagsfonden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
const StyledBody = styled.div``
export default MyApp
