import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ComponentWrapper, Layout, MintNFT, NotFound } from "../components";
import { NextComponentType } from "next";

const MintNFTs = () => {
  const [component, setComponent] = useState("");
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const page: any = query?.tab;
    setComponent(page);
  }, [query]);

  const redirect = (path: string) => {
    router.push(path);
  };

  const getContent = () => {
    if (component) {
      switch (component) {
        default: {
          return (
            <ComponentWrapper>
              <MintNFT />
            </ComponentWrapper>
          );
        }
      }
    }
    return (
      <section className="mt-20">
        <NotFound
          text="Whoops! It appears this page doesn't exist"
          onClick={() => redirect("/")}
        />
      </section>
    );
  };
  return getContent();
};

MintNFTs.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default MintNFTs;
