import placeholder from "@/assets/profile-pic-placeholder.png";
import Image from "next/image";

const AuthorCard = () => {
  return (
    <div className="flex gap-4 bg-slate-200 rounded-xl p-2 w-fit">
      <Image
        src={placeholder}
        width={60}
        height={60}
        alt="Author Image"
        className="h-[60px] w-[60px] rounded-full"
      />
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">Peter Ndungu</h4>
        <p>19 October, 2023</p>
      </div>
    </div>
  );
};

export default AuthorCard;
