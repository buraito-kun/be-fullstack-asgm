import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  const sidebar = Array.isArray(children) ? children[0] : null
  const content = Array.isArray(children) ? children[1] : null
  
  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 h-full">
        {sidebar}
      </div>
      <div className="w-4/5 h-full">{content}</div>
    </div>
  );
}
