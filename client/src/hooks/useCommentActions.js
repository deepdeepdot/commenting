import { useState, useEffect } from "react";
import useCommentState from "./useCommentState";
import axios from "axios";

// useAxios(): This idea doesn't work... hooks cannot be inside callbacks!
const USE_AJAX = true;
const API_BASE_URL = 'http://localhost:8080';

function getInitialComments() {
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
  return initialComments;
}

function getApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

function useCommentActions() {
  let {
    comments,
    setComments,
    selectedTags,
    setSelectedTags,
    selectedToogleTags,
    filteredComments,
    allTags
  } = useCommentState();

  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  let loadComments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getApiUrl("/comments"));
      console.log("runQuery.comments", res.data);

      let tags = selectedTags;
      setComments(res.data);
      setSelectedTags(tags); // restore selected tags
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    // Pretty horrible copy/paste (but react depedencies require this pattern)
    async function loadComments() {
      setIsLoading(true);
      try {
        const res = await axios.get(getApiUrl("/comments"));
        console.log("runQuery.comments", res.data);
        setComments(res.data);
        // setResponse(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    // very first time, only once
    if (USE_AJAX) {
      loadComments();
      // TODO: showAll option (including untagged ones)
    } else {
      let initialComments = getInitialComments();
      setComments(initialComments);
      setSelectedTags(["bug", "good first issue"]);
    }
  }, [setComments, setSelectedTags]);

  let runQuery = async (method, url, options) => {
    let firstQueryOk = false;
    setIsLoading(true);
    try {
      const res = await axios[method.toLowerCase()](url, options);
      console.log('runQuery', res.data);
      firstQueryOk = true;
      // setIsLoading(false);
    } catch (error) {
      setError(error);
    }
    if (!firstQueryOk) return;

    // Load updated comments and refresh app
    loadComments();
  }

  let add = comment => {
      if (USE_AJAX) {
        runQuery('post', getApiUrl('/comments'), comment);
      } else {
        comment.id = comments.length;
        setComments([...comments, comment]);
      }
  }

  let remove = id => {
      if (USE_AJAX) {
        runQuery("delete", getApiUrl(`/comments/${id}`));
      } else {
        setComments(comments.filter(comment => comment.id !== id));
      }
  }

  let update = (id, updatedComment) => {
      if (USE_AJAX) {
        runQuery('put', getApiUrl(`/comments/${id}`), updatedComment);
      } else {
        setComments(
          comments.map(comment => {
            if (comment.id === id) return updatedComment;
            return comment;
          })
        );
      }
  }

  let onTagSelected = label => {
    let updatedTags = selectedTags.includes(label)
        ? selectedTags.filter(tag => tag !== label) // Remove it
        : [...selectedTags, label]                  // Add it

    setSelectedTags(updatedTags);
  }

  return {
    add,
    remove,
    update,
    allTags,
    selectedToogleTags,
    onTagSelected,
    filteredComments,
    error,
    isLoading
  };
}

export default useCommentActions;