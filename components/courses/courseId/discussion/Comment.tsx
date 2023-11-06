import React from "react";
import AuthorCard from "@/components/author-card/AuthorCard";
import { Comment } from "@prisma/client";
import { db } from "@/lib/db";
import { format } from "date-fns";

interface Props {
  comment: Comment;
}

const Comment = async ({ comment }: Props) => {
  const user = await db.user.findUnique({
    where: { email: comment.userEmail },
  });
  const formattedDate = format(new Date(comment.createdAt), "yyyy-MM-dd");
  return (
    <div className="flex flex-col gap-2">
      <AuthorCard
        user={user}
        commentDate={formattedDate}
      />
      <p>{comment.message}</p>
    </div>
  );
};

export default Comment;
