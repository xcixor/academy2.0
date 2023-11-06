import placeholder from "@/assets/profile-pic-placeholder.png";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  user: User;
  commentDate: string;
}

const AuthorCard = ({ user, commentDate }: Props) => {
  return (
    <div className="flex gap-4 bg-slate-200 rounded-xl p-2 w-fit items-center">
      <Image
        src={user?.image || placeholder}
        width={60}
        height={60}
        alt="Author Image"
        className="h-[60px] w-[60px] rounded-full"
      />
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">{user?.email}</h4>
        <p>{commentDate}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
