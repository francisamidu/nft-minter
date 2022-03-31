import React, { useState } from "react";
import { uid } from "../helpers";
import { useApp } from "../contexts";
import Link from "next/link";
import millify from "millify";
import Button from "./Button";

const Nav = () => {
  const [links, setLinks] = useState([
    {
      active: true,
      id: uid(),
      path: "/",
      text: "Home",
    },
    {
      active: false,
      id: uid(),
      path: "/dashboard?tab=mint_an_nft",
      text: "Mint NFT",
    },
    {
      active: false,
      id: uid(),
      path: "/dashboard?tab=assets",
      text: "My Assets",
    },
  ]);
  const { account, balance: accountBalance, connectWallet, name } = useApp();
  const balance = Number(
    Number(accountBalance) > 10000 ? accountBalance.slice(0, 4) : accountBalance
  );
  const setLinkState = (id: string) => {
    setLinks(
      links.map((link) => {
        if (link.id === id) {
          link.active = true;
        } else {
          link.active = false;
        }
        return link;
      })
    );
  };
  const trimmedAddress = `${account.slice(0, 5)}...${account.slice(
    account.length - 5,
    account.length
  )}`;
  const [showMenu, setShowMenu] = useState(false);
  return (
    <section className="bg-white fixed top-0 left-0 w-full z-10 py-0">
      <div className="md:max-w-screen-xl md:mx-auto relative">
        <nav className="flex flex-row items-center justify-between py-[0.3rem] px-6">
          <h1 className="font-bold text-2xl text-[#05071b]">{name}</h1>
          <div className="hidden sm:flex flex-col sm:flex-row items-center">
            {links.map((link) => (
              <Link href={link.path} key={link.id}>
                <a
                  className={`transition-colors relative duration-300 font-bold text-md py-1 mr-5  border-transparent text-[#ababbb] ${
                    link.active ? "text-[#05071b]" : ""
                  }`}
                  onClick={() => setLinkState(link.id)}
                >
                  {link.text}
                </a>
              </Link>
            ))}
          </div>
          <div className="sm:flex flex-row items-center">
            <span className="hidden sm:block font-bold mr-6 text-white">
              {millify(balance)} ETH
            </span>
            <span className="hidden sm:block font-bold text-[#4552A8] bg-[#eee] rounded-md py-2 p-3">
              {trimmedAddress}
            </span>
            <Button
              text="Connect"
              className="bg-[#2133a715] text-[#2133a7] hover:text-white mt-0 ml-2 text-sm font-bold"
              onClick={connectWallet}
            />
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Nav;
