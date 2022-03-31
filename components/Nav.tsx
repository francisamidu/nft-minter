import React, { useState } from "react";
import { uid } from "../helpers";
import { useApp } from "../contexts";
import Link from "next/link";
import millify from "millify";
import { Button } from ".";
import { FaChevronDown as IChev } from "react-icons/fa";

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
      text: "Assets",
    },
  ]);
  const [connectionOptions, setConnectionOptions] = useState(false);
  const {
    account,
    active,
    balance: accountBalance,
    connectWallet,
    name,
    disconnectWallet,
  } = useApp();
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
  const toggleConnectionOptions = () => {
    setConnectionOptions(!connectionOptions);
  };
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
          <div className="sm:flex flex-row items-center relative">
            <span className="hidden sm:block font-bold mr-6 text-white">
              {millify(balance)} ETH
            </span>
            <span className="hidden sm:block font-bold text-[#4552A8] bg-[#eee] rounded-md py-2 p-3">
              {trimmedAddress}
            </span>
            <Button
              text="Connect"
              className="bg-[#2133a715] text-[#2133a7] hover:text-white mt-0 ml-2 text-sm font-bold"
              onClick={toggleConnectionOptions}
              icon={<IChev className="ml-2 text-[#2133a7] hover:text-white" />}
            />
            {connectionOptions && active ? (
              <div className="flex flex-col w-full absolute top-14 -right-2 z-10 bg-white rounded-md shadow max-w-fit transition-all duration-200">
                <span
                  className="cursor-pointer hover:bg-[#2133a715] transition-colors duration-300 p-2 hover:text-[#2133a7] rounded-t-md"
                  onClick={() => {
                    connectWallet("coinbase");
                    toggleConnectionOptions();
                  }}
                >
                  Coinbase Wallet
                </span>
                <span
                  className="cursor-pointer hover:bg-[#2133a715] transition-colors duration-300 p-2 hover:text-[#2133a7]"
                  onClick={() => {
                    connectWallet("walletconnect");
                    toggleConnectionOptions();
                  }}
                >
                  WalletConnect
                </span>
                <span
                  className="cursor-pointer hover:bg-[#2133a715] transition-colors duration-300 p-2 hover:text-[#2133a7] rounded-b-md"
                  onClick={() => {
                    connectWallet("metamask");
                    toggleConnectionOptions();
                  }}
                >
                  Metamask
                </span>
              </div>
            ) : connectionOptions && !active ? (
              <div className="flex flex-col w-full absolute top-14 -right-2 z-10 bg-white rounded-md shadow max-w-fit transition-all duration-200">
                <span
                  className="cursor-pointer hover:bg-[#2133a715] transition-colors duration-300 p-2 hover:text-[#2133a7] rounded-t-md"
                  onClick={() => {
                    disconnectWallet();
                  }}
                >
                  Disconnect Wallet
                </span>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Nav;
