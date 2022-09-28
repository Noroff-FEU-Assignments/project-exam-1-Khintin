const urlAllPosts = "https://cristinasyv.com/wp-json/wp/v2/posts?_embed";
const urlSinglePost =
  "https://cristinasyv.com/wp-json/wp/v2/posts?_embed&include[]=";
const postsElement = document.querySelector(".topic-post");
const queryString = new URLSearchParams(window.location.search);
const postId = queryString.get("id");

async function fetchApi() {
  try {
    if (postId === null) {
      // we didn't get an id so show all posts
      const response = await fetch(urlAllPosts);
      const result = await response.json();
      console.log(result); // remove this later

      postsElement.innerHTML = "";

      for (let i = 0; i < result.length; i++) {
        const post = result[i];
        postsElement.innerHTML += `<article class="blog-post-in-list">
        <div>
        <img class="featured-image" src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="Blog"></img>
        </div>
        <div>
        <h2>${post.title.rendered}</h2>
                      <p>${post.excerpt.rendered}</p>
                      <p><a href="post.html?id=${post.id}">Read more</a></p>
        </div>        
            </article>`;
      }
    } else {
      console.log("get just one post");
      const url = `${urlSinglePost}${postId}`;
      const response = await fetch(url);
      const posts = await response.json();
      const post = posts[0];
      console.log(url);

      postsElement.innerHTML = `<a href="?" class="back-button"><- back</a>
      <article class="blog-post">
        <img class="featured-image" src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="Blog"></img>
        <h2>${post.title.rendered}</h2>
        <p>${post.content.rendered}</p>
        <p><a href="post.html?id=${post.id}">Read more</a></p>
      </article>`;
    }
  } catch (error) {
    console.log("An error occured");
    console.log(error);
    postsElement.innerHTML = errorMessage(
      "An error occured while fetching the results"
    );
  }
}

fetchApi();
