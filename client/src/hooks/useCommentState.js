import { useState, useEffect } from "react";
import {
  getAllTags,
  createSelectedToggleTags,
  getFilteredComments
} from "../lib/tags";

function useCommentState() {
  let [comments, setComments] = useState([]);
  let [allTags, setAllTags] = useState([]);
  let [selectedTags, setSelectedTags] = useState([]);
  let [selectedToogleTags, setSelectedToggleTags] = useState([]);
  let [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    setSelectedToggleTags(createSelectedToggleTags(selectedTags, allTags));
  }, [allTags, selectedTags]);

  useEffect(() => {
    let updatedTags = getAllTags(comments);
    setAllTags(updatedTags);
  }, [comments]);

  useEffect(() => {
    let theComments = getFilteredComments(comments, selectedTags);
    setFilteredComments(theComments);
  }, [comments, selectedTags]);

  return {
    comments,
    setComments,
    selectedTags,
    setSelectedTags,
    selectedToogleTags,
    filteredComments,
    allTags
  };
}

export default useCommentState;
