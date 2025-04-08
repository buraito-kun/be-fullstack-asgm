type Props = {
  text: string;
  onClick?: ()=>void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      className="w-full h-20 bg-[#BDBEFF] rounded-full flex place-items-center place-content-center border border-black"
      onClick={onClick}
    >
      <h2 className="text-[24px] font-sans">{text}</h2>
    </button>
  );
}
