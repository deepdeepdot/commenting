import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TagListToggler from './TagListToggler';

function TagChooser({ id, toggleTags, onSelected, addTag, close }) {
  let [input, setInput] = useState('');

  let changeHandler = (e) => {
      setInput(e.target.value);
  }

  let handleSubmit = (e)=> {
      e.preventDefault();

      if (input !== '') {
        addTag(input);
        close();
      }
  }

  return (
    <div className="TagChooser">
      <h3>Tag Editor</h3>
      <form className="TagChooser__control" onSubmit={handleSubmit}>
        <input className="TagChooser__input" type="text" onChange={changeHandler}/>
        <button className="TagChooser__button" >
          <FontAwesomeIcon icon={faPlusCircle} />
          <span>Add New Tag</span>
        </button>
      </form>
      <div className="TagChooser__selection">
        <TagListToggler id={id} toggleTags={toggleTags} onSelected={onSelected} />
      </div>
    </div>
  );
}

export default TagChooser;
