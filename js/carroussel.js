const url = "https://cristinasyv.com/wp-json/wp/v2/posts?categories=19&_embed";
const buttonsWrapper = document.querySelector(".map");
const carroussel = document.querySelector(".carroussel-inner");

async function fetchApi() {
  try {
    const response = await fetch(url);
    result = await response.json();
    console.log(result); // remove this later

    carroussel.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
      const post = result[i];
      carroussel.innerHTML += `<div class="blog-post">
                    <a href="post.html?id=${post.id}">
                    <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="Blog"></img>
                    <div class="content">
                      <h2>${post.title.rendered}</h2>
                      <h3>${post.excerpt.rendered}</h3>
                    </div>
                    </a>
            </div>`;
    }

    // add an on click listener to the button wrapper
    buttonsWrapper.addEventListener("click", (e) => {
      // if a button is clicked
      if (e.target.nodeName === "BUTTON") {
        // remove active class from all buttons
        Array.from(buttonsWrapper.children).forEach((item) =>
          item.classList.remove("active")
        );
        if (e.target.classList.contains("first")) {
          // if the first one is clicked, set the position to 0%
          carroussel.style.transform = "translateX(-0%)";
          e.target.classList.add("active"); // and make this button active
        } else if (e.target.classList.contains("second")) {
          // if the second one is clicked, set the position to -1/3%
          carroussel.style.transform = "translateX(-33.33333333333%)";
          e.target.classList.add("active"); // and make this button active
        } else if (e.target.classList.contains("third")) {
          // if the third one is clicked, set the position to -2/3%
          carroussel.style.transform = "translatex(-66.6666666666666%)";
          e.target.classList.add("active"); // and make this button active
        }
      }
    });
  } catch (error) {
    console.log("An error occured");
    console.log(error);
    carroussel.innerHTML = errorMessage(
      "An error occured while fetching the results"
    );
  }
}

fetchApi();
