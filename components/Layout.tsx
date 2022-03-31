import React, { PropsWithChildren } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Nav } from ".";
import { useApp } from "../contexts";

const HomeLayout = (props: Partial<PropsWithChildren<AppProps>>) => {
  const { children } = props;
  const { name } = useApp();
  return (
    <>
      <Head>
        <title>{name} - NFTMinter for your NFTs</title>
        <meta name="description" content="NFTMinter for your NFTs" />
        <meta name="site-name" content={name} />
        <meta name="author" content="Francis Amidu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {children}
    </>
  );
};

export default HomeLayout;
