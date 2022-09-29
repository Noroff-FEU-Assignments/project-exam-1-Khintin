const urlAllPosts = "https://cristinasyv.com/wp-json/wp/v2/posts?_embed";
const urlSinglePost =
  "https://cristinasyv.com/wp-json/wp/v2/posts?_embed&include[]=";
const postsElement = document.querySelector(".topic-post");
const queryString = new URLSearchParams(window.location.search);
const postId = queryString.get("id");

async function fetchApi() {
  try {
    // we didn't get an id so show all posts
    const response = await fetch(urlAllPosts);
    const result = await response.json();
    console.log(result); // remove this later

    postsElement.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      postsElement.innerHTML += `<article class="blog-post-in-list">
        <div class="container">
          <div class="post-image">
          <img class="featured-image" src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="Blog"></img>
          </div>
          <div class="post-content">
          <h2>${post.title.rendered}</h2>
                        <p>${post.excerpt.rendered}</p>
                        <p><a href="onepost.html?id=${post.id}">Read more</a></p>
          </div>    
        </div>
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
