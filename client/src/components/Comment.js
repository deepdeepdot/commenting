import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faTimesCircle, faSave } from "@fortawesome/free-solid-svg-icons";
import TagBar from './TagBar';

function Comment(props) {
  let [contentDescription, setContentDescription] = useState(props.description || '');
  let [contentTitle, setContentTitle] = useState(props.title || '');
  let [contentTags, setContentTags] = useState(props.tags || []);
  let [isEditing, setIsEditing] = useState(props.createNewComment || false);
  let { id, addComment, removeComment, updateComment, allTags } = props;

  let viewActions = (
    <>
      <button
        className="Comment__button"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
        <span>Edit Text</span>
      </button>
      {!props.createNewComment && (
        <button
          className="Comment__button"
          onClick={() => removeComment(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </button>
      )}
    </>
  );

  let handleSave = (e) => {
    if (props.createNewComment) {
      addComment({
        title: contentTitle,
        description: contentDescription,
        tags: contentTags
      });
      setContentDescription("");
      setContentTitle("");
      setContentTags([]);
    } else {
      setIsEditing(false);

      updateComment(id, {
        id: id,
        title: contentTitle,
        description: contentDescription,
        tags: contentTags
      });
    }
  }

  let handleCancel = e => {
    if (props.createNewComment) {
      setContentDescription("");
      setContentTitle("");
      setContentTags([]);
    }
    setIsEditing(false);
  };

  let editActions = (
    <>
      <button
        className="Comment__button"
        onClick={handleSave}
      >
        <FontAwesomeIcon icon={faSave} />
        <span>Save</span>
      </button>
      <button
        className="Comment__button"
        onClick={handleCancel}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Cancel</span>
      </button>
    </>
  );

  let handleChange = e => {
    setContentTitle(e.target.value);
  };

  let handleTextAreaChange = (e) => {
    setContentDescription(e.target.value);
  }

  let updateCommentTags = (id, newTags) => {
    setContentTags(newTags);

    if (typeof id !== 'undefined') {
      updateComment(id, {
        id: id,
        title: contentTitle,
        description: contentDescription,
        tags: newTags
      });
    }
  }

  let toggleTag = label => {
    // if it's in the set, take it out, if not add it!
    let newTags = (contentTags.includes(label))
      ? contentTags.filter(tag => tag !== label)
      : [...contentTags, label];

    updateCommentTags(id, newTags);
  }

  let addTag = (label) => {
    let newTags = [...contentTags, label];;
    updateCommentTags(id, newTags);
  }

  // Test with and without memo()
  // console.log("RENDER COMMENT", contentTitle);

  return (
    <div className="Comment">
      <div className="Comment__toolbar">
        {isEditing ? (
          <>
            <label htmlFor="title">Title</label>
            <input
              value={contentTitle}
              name="title"
              onChange={handleChange}
              className="Comment__toolbar-input"
            />
          </>
        ) : (
          <div>{contentTitle}</div>
        )}
        <div className="Comment__toolbar-actions">
          {isEditing ? editActions : viewActions}
        </div>
      </div>

      <div className="Comment__content">
        <div className="Comment__content-text">
          {isEditing ? (
            <textarea
              value={contentDescription}
              onChange={handleTextAreaChange}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: contentDescription }} />
          )}
        </div>
        <div className="Comment__content-tags">
          <TagBar
            tags={contentTags}
            allTags={allTags}
            onTagSelected={toggleTag}
            addTag={addTag}
          />
        </div>
      </div>
    </div>
  );
}

// export default Comment;

// Optimization
// It works usually, except for the new Comment: no toggle tags, hence check on 'id' for falsy
export default React.memo(Comment, function areEqual(prevProps, nextProps) {
  return (
    nextProps.id && // new Comment doesn't have an ID yet and we want to refresh in this scenario
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    // eslint-disable-next-line eqeqeq
    JSON.stringify(prevProps.tags) == JSON.stringify(nextProps.tags)
  );
});
