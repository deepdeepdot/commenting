import React from 'react'
import TagListToggler from "./TagListToggler";

function TagFilter(props) {
  // console.log('RENDER TagFilter');
  let { selectedToogleTags, onTagSelected } = props;

  return (
    <div className="TagFilter">
      <h3 className="TagFilter-title">Tag Filter</h3>
      {/* <button onClick={selectAllTags}>Show ALL</button> */}
      <TagListToggler
        toggleTags={selectedToogleTags}
        onSelected={onTagSelected}
      />
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  return (
      JSON.stringify(prevProps.selectedToogleTags) ===
      JSON.stringify(nextProps.selectedToogleTags)
  );
}
export default React.memo(TagFilter, areEqual);
// export default TagFilter;