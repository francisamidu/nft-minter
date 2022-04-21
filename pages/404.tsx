import React from "react";
import Head from "next/head";

const NotFoundPage = (props: any) => {
  return (
    <>
      <Head>
        <title>404 - It appears youre lost</title>
      </Head>
      <main className="dark flex flex-row items-center justify-center">
        <h1 className="text-xl font-bold">Ehhh you lost</h1>
      </main>
    </>
  );
};

export default NotFoundPage;
