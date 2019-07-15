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

  let handleChange = (e) => {
    setContentTitle(e.target.value);
  }

  let editActions = (
    <>
      <button
        className="Comment__button"
        onClick={e => {
          if (props.createNewComment) {
            addComment({
              title: contentTitle,
              description: contentDescription,
              tags: contentTags
            });
            setContentDescription('');
            setContentTitle('');
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
        }}
      >
        <FontAwesomeIcon icon={faSave} />
        <span>Save</span>
      </button>
      <button
        className="Comment__button"
        onClick={e => {
          if (props.createNewComment) {
            setContentDescription("");
            setContentTitle("");
            setContentTags([]);
            setIsEditing(false);
          } else {
            setIsEditing(false);
          }
        }}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
        <span>Cancel</span>
      </button>
    </>
  );

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

export default Comment;