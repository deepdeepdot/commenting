import React from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Comment from './Comment';

function CommentList({ comments, allTags, removeComment, updateComment }) {
  return (
    <ul className="CommentList">
      <TransitionGroup>
        {comments.map(comment => (
          <CSSTransition key={comment.id} timeout={300} classNames="fade">
            <li>
              <Comment
                {...comment}
                allTags={allTags}
                removeComment={removeComment}
                updateComment={updateComment}
              />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}

export default CommentList;