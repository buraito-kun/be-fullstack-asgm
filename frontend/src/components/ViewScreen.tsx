import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function ViewScreen({ children }: Props) {
  return <div className="w-screen h-screen bg-[#D8ECFF] flex flex-col overflow-auto">{children}</div>;
}
