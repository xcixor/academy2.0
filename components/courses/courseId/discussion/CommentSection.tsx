import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface Props {
  courseId: string;
}

const CommentSection = ({ courseId }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <CommentForm courseId={courseId} />
      </div>
      <CommentList courseId={courseId} />
    </div>
  );
};

export default CommentSection;
