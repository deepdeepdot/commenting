import React from "react";

let noop = (label) => {
    console.log("Please override ToggleTag.noop!");
};

function ToggleTag({ label, selected, onSelected = noop }) {
    let className = `Toggle__button${(selected && '--selected') || ''}`;

    let handleSelect = () => {
        onSelected(label);
    }
    return (
      <button className={className} onClick={handleSelect}>
        {label}
      </button>
    );
}

function TagListToggler({ toggleTags, onSelected }) {
  return (
    <ul className="TagList">
      {toggleTags.map(tag => (
        <li key={tag.label}>
          <ToggleTag
            {...tag}
            selected={tag.selected}
            onSelected={onSelected}
          />
        </li>
      ))}
    </ul>
  );
}

export default TagListToggler;