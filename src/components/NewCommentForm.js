import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Comment from './Comment';

let initialState = {
  title: "",
  description: "",
  tags: []
};

function NewCommentForm(props) {
    let [hiding, setHiding] = useState(true);
    let [comment, setComment] = useState(initialState);
    let { allTags } = props;

    let toggle = () => setHiding(!hiding);

    let addComment = (comment) => {
      props.addComment(comment);
      setComment(initialState);
    }

    return (
      <div className="NewCommentForm">
        <button className="NewCommentForm__button" onClick={toggle}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>Add New Comment</span>
        </button>
        {hiding && <Comment
            createNewComment
            {...comment}
            addComment={addComment}
            allTags={allTags}
          />
          }
      </div>
    );
}

export default NewCommentForm;