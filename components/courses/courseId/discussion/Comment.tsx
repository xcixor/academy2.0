import React from "react";
import AuthorCard from "@/components/author-card/AuthorCard";

const Comment = () => {
  return (
    <div className="flex flex-col gap-2">
      <AuthorCard />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quos
        earum. Fuga quas eveniet id omnis quos? Dolorum, quam quae nemo
        explicabo aliquid quo harum error dignissimos veniam, maxime
        consequuntur!
      </p>
    </div>
  );
};

export default Comment;
