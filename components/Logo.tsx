import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      className="h-[110px] w-[130px]"
      height={110}
      width={130}
      alt="PES Academy logo"
      src="/PES-Academy-logo.png"
    />
  );
};
