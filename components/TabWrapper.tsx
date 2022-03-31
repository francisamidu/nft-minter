import React from "react";
import { FaUser as IUser, FaMoneyBill as IMoney } from "react-icons/fa";
import router from "next/router";

import { useApp, useTabs } from "../contexts";
import { OptionTabs } from ".";
import { Tab } from "../types";
import millify from "millify";

const TabWrapper = () => {
  const { tabs, setTabs: setActiveTab } = useTabs();
  const { account, balance: accountBalance } = useApp();
  const balance = Number(
    Number(accountBalance) > 10000 ? accountBalance.slice(0, 4) : accountBalance
  );
  const trimmedAddress = `${account.slice(0, 5)}...${account.slice(
    account.length - 5,
    account.length
  )}`;
  const setTabs = (tabs: Tab[]) => {
    const activeTab = tabs.find((t) => !!t.active);
    setActiveTab(tabs);
    router.push(
      `/dashboard?tab=${activeTab.name
        .replaceAll(" ", "_")
        .toLocaleLowerCase()}`
    );
  };
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
            <span className="ml-1">{millify(balance)}ETH</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default TabWrapper;
