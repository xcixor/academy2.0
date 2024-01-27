import { Logo } from "@/components/Logo";
import { UserCog2 } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grainy">
      <div className="w-full justify-between gap-4 rounded-md align-middle md:flex">
        <div className="flex basis-1/2 flex-col items-center justify-center gap-4 bg-sky-50">
          <Logo />
          <div className="flex items-center gap-2">
            <UserCog2 className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Signup</h1>
          </div>
          <p className="text-center">
            Join hundreds of students taking their business <br /> knowledge to
            the next level
          </p>
        </div>
        <div className="flex basis-1/2 justify-center px-[5%] align-middle md:py-[10%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;