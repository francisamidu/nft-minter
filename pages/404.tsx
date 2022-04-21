import React from "react";
import Head from "next/head";

const NotFoundPage = (props: any) => {
  return (
    <>
      <Head>
        <title>404 - It appears youre lost</title>
      </Head>
      <main className="dark">Ehhh you lost</main>
    </>
  );
};

export default NotFoundPage;
