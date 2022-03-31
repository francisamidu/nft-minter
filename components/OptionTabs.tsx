import React, { Dispatch, SetStateAction } from "react";
import { Tab } from "../types";

type OptionTabs = {
  tabs: Tab[];
  setTabs: Dispatch<SetStateAction<Tab[]>>;
};
const TaskTab = ({ setTabs, tabs }: OptionTabs) => {
  const toggleTab = (id: string | number) => {
    const newTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.active = true;
      } else {
        tab.active = false;
      }
      return tab;
    });

    setTabs(newTabs);
  };
  return (
    <div className="flex flex-row items-center justify-center">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`cursor-pointer -mb-[.15rem] py-2 px-2 border-b-2 border-transparent ${
            tab.active && "border-blue-500"
          }`}
        >
          <span
            onClick={() => toggleTab(tab.id)}
            className={`text-sm font-bold ${tab.active && "text-blue-500"}`}
          >
            {tab.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskTab;
