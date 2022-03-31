import React, { MouseEventHandler } from "react";
import { VscArrowRight as ArrowRight } from "react-icons/vsc";

type ButtonProps = {
  icon?: JSX.Element;
  text: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  right?: boolean;
  className?: string;
};

const Button = ({
  text,
  onClick,
  right = false,
  className,
  type = "button",
  icon,
}: ButtonProps) => {
  const handleClick = typeof onClick === "function" ? onClick : () => {};
  if (className) {
    return (
      <button
        className={`cursor-pointer w-max h-12 px-8 py-2 mt-4 rounded-lg text-white font-bold text-sm flex flex-row items-center justify-center transition duration-500 outline-none bg-[#2133a7] hover:bg-[#1d2c8f] ${className}`}
        onClick={handleClick}
        type={type}
      >
        {text}
        {right && <ArrowRight className="text-1xl text-white ml-2" />}
        {icon && icon}
      </button>
    );
  }
  return (
    <button
      className="cursor-pointer w-max h-12 px-8 py-2 mt-4 rounded-lg text-white flex flex-row items-center justify-center transition duration-500 outline-none font-bold text-sm bg-[#2133a7] hover:bg-[#1d2c8f]"
      onClick={handleClick}
      type={type}
    >
      {text}
      {right && <ArrowRight className="text-1xl text-white ml-2" />}
    </button>
  );
};

export default Button;
