import Link from "next/link";
import { Logo } from "../Logo";
import SidebarRoutes from "./SidebarRoutes";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
