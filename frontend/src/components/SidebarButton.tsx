import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router";

type Props = PropsWithChildren & {
  text: string;
  to: string;
};

export default function SidebarButton({ text, to, children }: Props) {
  const location = useLocation();

  if (location.pathname === to)
    return (
      <Link
        to={to}
        tabIndex={0}
        className="mt-3 w-full h-16 bg-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:cursor-pointer relative flex place-items-center place-content-center"
      >
        <h2 className="text-[24px] font-sans">{text}</h2>
        <div className="absolute left-5 h-2/3 aspect-square flex place-items-center place-content-center">
          {children}
        </div>
      </Link>
    );
  else
    return (
      <Link
        to={to}
        tabIndex={0}
        className="mt-3 w-full h-16 bg-white rounded-full hover:bg-[#D9D9D9] hover:cursor-pointer relative flex place-items-center place-content-center"
      >
        <h2 className="text-[24px] font-sans">{text}</h2>
        <div className="absolute left-5 h-2/3 aspect-square flex place-items-center place-content-center">
          {children}
        </div>
      </Link>
    );
}
