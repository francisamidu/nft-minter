import React, { MouseEventHandler } from "react";
import { Button } from ".";

type NotFoundProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const NotFound = ({ text, onClick }: NotFoundProps) => {
  const handleClick = typeof onClick === "function" ? onClick : () => {};
  return (
    <div className="flex flex-col justify-center items-center py-4 my-4 item-not-found">
      <h1 className="text-2xl text-center">{text}</h1>
      <Button text="Go Home" className="mt-4" onClick={handleClick} />
    </div>
  );
};

export default NotFound;
