import React from "react";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import TagListToggler from "./TagListToggler";
import useCommentActions from '../hooks/useCommentActions';

import "../sass/main.scss"; // this is for triggering automatic sass rebuilds

function App() {
  let {
    add,
    remove,
    update,
    allTags,
    selectedToogleTags,
    onTagSelected,
    filteredComments,
    error,
    isLoading
  } = useCommentActions();

  if (error) {
    return <h3>Found some error</h3>
  }
  if (isLoading) {
    return <div>Loading.... (use a loader spinner instead)</div>;
  }
  // console.log("RE-RENDER APP");
  return (
    <>
      <NewCommentForm addComment={add} allTags={allTags} />

      <div className="TagFilter">
        <h3 className="TagFilter-title">Tag Filter</h3>
        {/* <button onClick={selectAllTags}>Show ALL</button> */}
        <TagListToggler
          toggleTags={selectedToogleTags}
          onSelected={onTagSelected}
        />
      </div>

      <CommentList
        allTags={allTags}
        comments={filteredComments}
        removeComment={remove}
        updateComment={update}
      />
    </>
  );
}

export default App;
