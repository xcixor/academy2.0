import { MobileSidebar } from "./MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";
import { getLoggedInUser } from "@/lib/auth/utils";

export const Navbar = async () => {
  const user = await getLoggedInUser();

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes user={user} />
    </div>
  );
};
