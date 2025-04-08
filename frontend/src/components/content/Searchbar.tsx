import { search } from "../Icon";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  text: string;
};

export default function Searchbar({ setSearch, text }: Props) {
  return (
    <div className="flex place-items-end w-full">
      <label className="w-full">
        <h3 className="text-[20px] font-sans pl-10 py-3">{text}</h3>
        <input
          type="text"
          className="w-full px-3 h-12 border-2 border-black rounded-full text-2xl"
          placeholder="ค้นหา..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      {search}
    </div>
  );
}
