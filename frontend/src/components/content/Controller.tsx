import { PropsWithChildren } from "react"

type Props = PropsWithChildren

export default function Controller({ children }: Props){
  const search = Array.isArray(children) ? children[0] : null;
  const button = Array.isArray(children) ? children[1] : null;

  return (
    <div className="w-full h-full flex">
      <div className="w-9/12 h-full flex place-items-center px-10">
        {search}
      </div>
      <div className="w-3/12 h-full flex place-items-center px-10">
        {button}
      </div>
    </div>
  )
}
