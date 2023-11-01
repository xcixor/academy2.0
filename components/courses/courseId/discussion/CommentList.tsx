import Comment from "./Comment";

const CommentList = () => {
  return (
    <div className="flex flex-col gap-6">
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default CommentList;
