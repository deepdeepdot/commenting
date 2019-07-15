import React from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faTimes } from "@fortawesome/free-solid-svg-icons";
import TagList from "./TagList";
import TagChooser from './TagChooser';
import { createSelectedToggleTags } from "../lib/tags";

function TagBar({ tags, allTags, onTagSelected, addTag }) {
  return (
    <div className="TagBar">
      <div className="TagBar__taglist-toggler">
        <TagList tags={tags} />
      </div>
      <Popup
        className="tag-selector-popup"
        trigger={
          <button className="TagBar__button">
            <FontAwesomeIcon icon={faTags} />
            <span>Edit Tags</span>
          </button>
        }
        position="left top"
      >
        {close => (
          <div className="tag-selector-close">
            <button onClick={close}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <TagChooser
              toggleTags={createSelectedToggleTags(tags, allTags)}
              onSelected={onTagSelected}
              addTag={addTag}
              close={close}
            />
          </div>
        )}
      </Popup>
    </div>
  );
}

export default TagBar;