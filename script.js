import { getPosts, addPost, deletePost, editPost } from "./storage.js";

const posts = getPosts();

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("posts")) {
    localStorage.setItem("posts", []);
  }
  posts.map((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.id = post.id;
    postDiv.innerHTML = `
        <div>
          <button class="editPostBtn"><a href="addEditPost.html?id=${post.id}">Edit</a></button>
          <button class="deletePostBtn">Delete</button>
        </div>
        <img src="${post.image}" alt="post image" />
        <h2 class="post-title">${post.title}</h2>
        <p class="post-content">${post.content}</p>
      `;
    document.querySelector(".all-posts").appendChild(postDiv);

    const deletePostBtn = postDiv.querySelector(".deletePostBtn");
    deletePostBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(post.id);
        postDiv.remove();
      }
    });
  });
});
