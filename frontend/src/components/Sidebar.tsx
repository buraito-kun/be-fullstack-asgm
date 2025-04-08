import { classroom, student } from "./Icon";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className="absolute w-1/5 h-full px-8">
      <div className="bg-[#9496FF]/[.8] w-full h-full rounded-full shadow-[16px_14px_24px_rgba(0,0,0,0.25)]">
        <div className="bg-white w-full aspect-square rounded-full border-[3px] border-black">
          <div className="w-full h-full flex place-items-center place-content-center">
            <img src="logo512.png" alt="logo" className="w-1/2 h-1/2" />
          </div>
        </div>
        <h2 className="py-5 text-[32px] font-bold font-sans">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เมนู
        </h2>
        <SidebarButton text="นักเรียน" to="/">{student}</SidebarButton>
        <SidebarButton text="ห้องเรียน" to="/classroom">{classroom}</SidebarButton>
        <SidebarButton text="Raw Query" to="/rawQuery"></SidebarButton>
      </div>
    </div>
  );
}
