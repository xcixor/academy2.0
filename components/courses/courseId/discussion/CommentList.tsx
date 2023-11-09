import { db } from "@/lib/db";
import Comment from "./Comment";
import useSWR from "swr";

interface Props {
  courseId: string;
}

const CommentList = async ({ courseId }: Props) => {
  const comments = await db.comment.findMany({
    where: {
      courseId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true },
  });

  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
