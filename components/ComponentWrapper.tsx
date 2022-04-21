import React, { PropsWithChildren, ReactNode } from "react";
import { TabWrapper } from ".";

const ComponentWrapper = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <main className="dark dark:bg-gray-800 dark:text-gray-100">
      <TabWrapper />
      {children}
    </main>
  );
};

export default ComponentWrapper;
