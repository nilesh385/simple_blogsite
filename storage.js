const getPosts = () => {
  const postsData = JSON.parse(localStorage.getItem("posts"));
  if (postsData) {
    return postsData;
  } else {
    return [];
  }
};

const postExist = (id) => {
  let posts = getPosts();
  posts.map((post) => {
    if (post.id === id) {
      return true;
    }
    return false;
  });
};
const getPost = (id) => {
  let posts = getPosts();
  const post = posts.find((post) => post.id === id);
  return post;
};
const addPost = (title, content, image) => {
  let posts = getPosts();
  const id = crypto.randomUUID();
  posts.push({ id, title, content, image });
  localStorage.setItem("posts", JSON.stringify(posts));
};
const editPost = (id, title, content, image) => {
  let posts = getPosts();
  posts[id] = { title, content, image };
  localStorage.setItem("posts", JSON.stringify(posts));
};

const deletePost = (id) => {
  let posts = getPosts();
  posts.splice(id, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
};

export { postExist, getPost, getPosts, addPost, deletePost, editPost };
