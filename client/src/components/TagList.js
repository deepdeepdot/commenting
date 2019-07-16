import React from 'react';

let noop = () => {};

function Tag({ tag, onClick = noop }) {
  return (
    <div className="TagList__item" onClick={() => onClick(tag)}>
      {tag}
    </div>
  );
}

function TagList({ tags, onClick }) {
    let sorted = tags.sort();
    return (
      <ul className="TagList">
        {sorted.map(tag => (
          <li key={tag}>
            <Tag tag={tag} onClick={onClick} />
          </li>
        ))}
      </ul>
    );
}

export default TagList;