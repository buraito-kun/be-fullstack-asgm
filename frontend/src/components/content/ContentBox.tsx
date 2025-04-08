import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export default function ContentBox({ children }: Props) {
  const controller = Array.isArray(children) ? children[0] : null;
  const content = Array.isArray(children) ? children[1] : null;

  return (
    <div className="w-full h-full">
      <div className="w-full h-1/3 pt-[80px]">
        <div className="w-full h-full px-8 py-5">
          <div className="w-full h-full bg-white rounded-[40px] shadow-[16px_14px_24px_rgba(0,0,0,0.25)]">{controller}</div>
        </div>
      </div>
      <div className="w-full h-2/3 px-8 py-5">
        <div className="w-full h-full bg-white rounded-[40px] shadow-[16px_14px_24px_rgba(0,0,0,0.25)]">{content}</div>
      </div>
    </div>
  );
}
