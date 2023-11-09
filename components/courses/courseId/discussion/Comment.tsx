import React from "react";
import AuthorCard from "@/components/author-card/AuthorCard";
import { Comment, User } from "@prisma/client";
import { format } from "date-fns";

type CommentProps = {
  comment: Comment & { user: User };
};

const Comment = async ({ comment }: CommentProps) => {
  const formattedDate = format(new Date(comment.createdAt), "yyyy-MM-dd");
  return (
    <div className="flex flex-col gap-2">
      <AuthorCard user={comment.user} commentDate={formattedDate} />
      <p>{comment.message}</p>
    </div>
  );
};

export default Comment;
