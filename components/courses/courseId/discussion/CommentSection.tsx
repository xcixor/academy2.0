import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  return (
    <div>
      <div className="mb-4">
        <CommentForm />
      </div>
      <CommentList />
    </div>
  );
};

export default CommentSection;
