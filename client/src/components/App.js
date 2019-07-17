import React from "react";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import TagFilter from "./TagFilter";
import LoadingPanel from "./LoadingPanel";
import useCommentActions from "../hooks/useCommentActions";

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
    return <h3>Found some error</h3>;
  }
  // isLoading = true; // just for testing
  // console.log("RE-RENDER APP");

  return (
    <div className="App">
      {isLoading && <LoadingPanel />}
      <NewCommentForm addComment={add} allTags={allTags} />

      <TagFilter
        selectedToogleTags={selectedToogleTags}
        onTagSelected={onTagSelected}
      />
      <CommentList
        allTags={allTags}
        comments={filteredComments}
        removeComment={remove}
        updateComment={update}
      />
    </div>
  );
}

export default App;
