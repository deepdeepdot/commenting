import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import NewCommentForm from "./NewCommentForm";
import TagListToggler from './TagListToggler';

import {
  getAllTags,
  createSelectedToggleTags,
  getFilteredComments
} from "../lib/tags";

import "../sass/main.scss"; // this is for triggering automatic sass rebuilds

// let allTags = [
//   "bug",
//   "docs",
//   "dup",
//   "help wanted",
//   "invalid",
//   "question",
//   "wontfix",
//   "good first issue"
// ];

let tagSets = [
  ["bug", "help wanted", "question", "wontfix", "dup"],
  ["docs", "help wanted", "good first issue"]
];

let comment = {
  title: "Joel commented 14 days ago",
  description: "<h1>Some <i>Italic</i> content</h1>",
  tags: ["one", "two", "three"]
};

let spaces = new Array(2).fill(null);
let initialComments = spaces.map((_, idx) => ({
    ...comment,
    id: idx,
    tags: tagSets[idx % 2]
}));

function App() {
    let [comments, setComments] = useState(initialComments);
    let [allTags, setAllTags] = useState(getAllTags(comments));
    let [selectedTags, setSelectedTags] = useState(['bug', 'good first issue']);
    let [selectedToogleTags, setSelectedToggleTags] = useState(
      createSelectedToggleTags(selectedTags, allTags)
    );
    let [filteredComments, setFilteredComments] = useState([]);

    useEffect(() => {
      setSelectedToggleTags(
        createSelectedToggleTags(selectedTags, allTags)
      );
    }, [allTags, selectedTags]);

    useEffect(() => {
        let updatedTags = getAllTags(comments);
        setAllTags(updatedTags);
    }, [comments]);

    useEffect(() => {
        let theComments = getFilteredComments(comments, selectedTags);
        setFilteredComments(theComments);
    }, [comments, selectedTags]);

    let add = (comment) => {
        comment.id = comments.length;
        setComments([...comments, comment]);
    }

    let remove = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
    }

    let update = (id, updatedComment) => {
        setComments(comments.map(comment => {
            if (comment.id === id) return updatedComment;
            return comment;
          })
        );
    }

    let onTagSelected = (label) => {
        if (selectedTags.includes(label)) {
            // Remove it
            setSelectedTags(selectedTags.filter(tag => tag !== label));
        }
        else {
            // Add it
            setSelectedTags([...selectedTags, label]);
        }
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
