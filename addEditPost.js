import { editPost, getPost, postExist, addPost } from "./storage.js";

const form = document.querySelector("form");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const image = document.querySelector("#image");
const imagePlaceholder = document.querySelector("#image-placeholder");

const postId = new URLSearchParams(window.location.search).get("id");

if (postId) {
  const tableHead = document.getElementById("table-head");
  tableHead.innerHTML = "Edit Post";
  console.log(postId);
  const post = getPost(postId);
  console.log(post);

  title.value = post.title;
  content.value = post.content;
  const previewImageDiv = document.getElementsByClassName("imageDiv")[0];
  previewImageDiv.innerHTML = `<img src="${post.image}" alt="post image" />`;
  imagePlaceholder.textContent = post.image;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const postExists = postExist(postId);
  const imagefile = document.getElementById("image").files[0];
  const image = URL.createObjectURL(imagefile);
  if (postExists) {
    editPost(postId, title.value, content.value, image);
    window.location.href = "index.html";
  } else {
    addPost(title.value, content.value, image);
    window.location.href = "index.html";
  }
});

image.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const previewImageDiv = document.getElementsByClassName("imageDiv")[0];
  if (file) {
    const img_url = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.src = img_url;
    img.height = 300;
    img.width = 300;
    previewImageDiv.innerHTML =
      img.outerHTML + ` <span id="removeImage">X</span>`;
    const removeImage = document.getElementById("removeImage");
    removeImage?.addEventListener("click", () => {
      image.value = null;
      imagePlaceholder.textContent = "Upload image";
      const previewImageDiv = document.getElementsByClassName("imageDiv")[0];
      previewImageDiv.innerHTML = `<label for="image" id="image-placeholder">Upload Image</label>`;
    });
  }
});
