const urlSinglePost =
  "https://cristinasyv.com/wp-json/wp/v2/posts?_embed&include[]=";
const postsElement = document.querySelector(".topic-onepost");
const queryString = new URLSearchParams(window.location.search);
const postId = queryString.get("id");

async function fetchApi() {
  try {
    console.log("get just one post");
    const url = `${urlSinglePost}${postId}`;
    const response = await fetch(url);
    const posts = await response.json();
    const post = posts[0];
    console.log(url);
    document.title = post.title.rendered;

    const dialog = document.querySelector("#dialog");
    const dialogImage = document.querySelector("#dialog-image");
    if (dialogImage) {
      console.log(post._embedded);
      dialogImage.src = post._embedded["wp:featuredmedia"][0].source_url;
      // dialogImage.setAttribute("src", post._embedded["wp:featuredmedia"][0].source_url);
    }

    postsElement.innerHTML = `
      <article class="blog-post">
      <h2>${post.title.rendered}</h2>
        <img id="post-featured-image" class="featured-image" src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="Blog"></img>
        <p>${post.excerpt.rendered}</p>
      </article>
      <a href="/post.html" class="back-button"><- back</a>
      `;

    const postImage = document.querySelector("#post-featured-image");

    postImage.addEventListener("click", () => {
      // Open the modal dialog
      // something like
      dialog.showModal();
    });
  } catch (error) {
    console.log("An error occured");
    console.log(error);
    postsElement.innerHTML = errorMessage(
      "An error occured while fetching the results"
    );
  }
}

fetchApi();
