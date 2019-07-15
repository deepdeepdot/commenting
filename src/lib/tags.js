let createSelectedToggleTags = (tags, allTags) => {
  return allTags.map(elt => {
    return {
      label: elt,
      selected: tags.includes(elt)
    };
  });
};

let getAllTags = comments => {
  let allTags = comments.reduce((acc, elt) => {
    return [...acc, ...elt.tags];
  }, []);
  let set = new Set(allTags);
  return Array.from(set).sort();
}

let getFilteredComments = (comments, selectedTags) => {
    return comments.filter(comment =>
      comment.tags.some(tag => selectedTags.includes(tag))
    );
}

export { getAllTags, createSelectedToggleTags, getFilteredComments };