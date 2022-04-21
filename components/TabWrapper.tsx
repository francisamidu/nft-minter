import React, { useEffect, useState } from "react";
import { FaUser as IUser, FaMoneyBill as IMoney } from "react-icons/fa";
import router from "next/router";

import { useWallet, useTabs } from "../contexts";
import { OptionTabs } from ".";
import { Tab } from "../types";
import millify from "millify";

const TabWrapper = () => {
  const { tabs, setTabs: setActiveTab } = useTabs();
  const { account, active, balance: accountBalance } = useWallet();
  const [balance, setBalance] = useState<string | number>("0x00");
  const [trimmedAddress, setTrimmedAddress] = useState("0x00");
  const setTabs = (tabs: Tab[]) => {
    const activeTab = tabs.find((t) => !!t.active);
    setActiveTab(tabs);
    router.push(
      `/dashboard?tab=${activeTab.name
        .replaceAll(" ", "_")
        .toLocaleLowerCase()}`
    );
  };
  useEffect(() => {
    if (account && accountBalance && active) {
      setTrimmedAddress(
        `${account.slice(0, 5)}...${account.slice(
          account.length - 5,
          account.length
        )}`
      );
      setBalance(
        Number(
          Number(accountBalance) > 10000
            ? accountBalance.slice(0, 4)
            : accountBalance
        )
      );
    }
  }, [account, accountBalance, active]);
  return (
    <>
      <section className="flex flex-row items-center justify-between md:max-w-screen-md mx-auto mt-16 border-b-gray-100 border-b-2">
        <OptionTabs tabs={tabs} setTabs={setTabs} />
        <div className="flex flex-row items-center mr-2">
          <div className="relative flex flex-row items-center">
            <IUser className="text-1xl text-blue-400" />
            <span className="ml-1">{trimmedAddress}</span>
          </div>
          <div className="flex flex-row items-center ml-2">
            <IMoney className="text-1xl text-blue-400" />
            <span className="ml-1">{millify(Number(balance))}ETH</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TabWrapper;
