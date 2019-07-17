import { useState, useEffect } from "react";
import useCommentState from "./useCommentState";
import axios from "axios";

// useAxios(): This idea doesn't work... hooks cannot be inside callbacks!
const USE_IN_MEMORY = false;
const USE_AJAX_WITHOUT_COMMENTS_RELOAD = true;
const API_BASE_URL = 'http://localhost:8080';

function getInitialComments() {
  const NUM_ELTS = 10;

  let tagSets = [
    ["bug", "help wanted", "question", "wontfix", "dup"],
    ["docs", "help wanted", "good first issue"]
  ];
  let comment = {
    title: "Joel commented 14 days ago",
    description: "<h1>Some <i>Italic</i> content</h1>",
    tags: ["one", "two", "three"]
  };
  let spaces = new Array(NUM_ELTS).fill(null);
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
    // Pretty horrible copy/paste (but react's reactivity require this pattern)
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
    if (USE_IN_MEMORY) {
      let initialComments = getInitialComments();
      setComments(initialComments);
      setSelectedTags(["bug", "good first issue"]);
    } else {
      loadComments();
      // TODO: showAll option (including untagged ones)
    }
  }, [setComments, setSelectedTags]);

  let runQuery = async (method, url, options) => {
    let firstQueryOk = false;
    setIsLoading(true);
    try {
      const res = await axios[method](url, options);
      console.log('runQuery', res.data);
      firstQueryOk = true;
      if (USE_AJAX_WITHOUT_COMMENTS_RELOAD) {
        setIsLoading(false);
      }
      return res.data;
    } catch (error) {
      setError(error);
    }

    if (USE_IN_MEMORY || !USE_AJAX_WITHOUT_COMMENTS_RELOAD) {
      if (!firstQueryOk) return;
      // Load updated comments and refresh app
      loadComments();
    }
  }

  let add = async (comment) => {
    let newComment;

    if (USE_IN_MEMORY) {
      newComment = comment;
      newComment.id = comments.length;
    } else {
      newComment = await runQuery('post', getApiUrl('/comments'), comment);
    }

    if (USE_IN_MEMORY || USE_AJAX_WITHOUT_COMMENTS_RELOAD) {
      setComments([...comments, newComment]);
    }
  }

  let remove = async (id) => {
    if (!USE_IN_MEMORY) {
      await runQuery("delete", getApiUrl(`/comments/${id}`));
    }
    if (USE_IN_MEMORY || USE_AJAX_WITHOUT_COMMENTS_RELOAD) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  }

  let update = async (id, comment) => {
    let updatedComment = USE_IN_MEMORY
      ? comment
      : await runQuery("put", getApiUrl(`/comments/${id}`), comment);

    if (USE_IN_MEMORY || USE_AJAX_WITHOUT_COMMENTS_RELOAD) {
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