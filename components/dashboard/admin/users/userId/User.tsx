import { User } from "@prisma/client";
import React from "react";
import UserTypeForm from "./UserTypeForm";
import { Settings, Settings2 } from "lucide-react";

type Props = {
  user: User;
};

const User = ({ user }: Props) => {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Manage User</h1>
        <Settings className="text-blue-400" />
      </div>
      <div className="md:w-1/2 space-y-2">
        <div className="rounded-md bg-slate-100 p-4">{user.name}</div>
        <div className="rounded-md bg-slate-100 p-4">{user.email}</div>
      </div>
      <div>
        <UserTypeForm initialData={user} />
      </div>
    </div>
  );
};

export default User;
