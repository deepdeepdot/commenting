import React from 'react'
import Comment from './Comment';

function CommentList({ comments, allTags, removeComment, updateComment }) {
  return (
    <ul className="CommentList">
      {comments.map(comment => (
        <li key={comment.id}>
          <Comment
            {...comment}
            allTags={allTags}
            removeComment={removeComment}
            updateComment={updateComment}
          />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;