import React, { PropsWithChildren, ReactNode } from "react";
import { TabWrapper } from ".";

const ComponentWrapper = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <main>
      <TabWrapper />
      {children}
    </main>
  );
};

export default ComponentWrapper;
