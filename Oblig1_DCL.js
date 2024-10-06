//Gloabal variable controlling how many posts to load at once
let limit = 6;

//Function to fetch content from JSONPlaceholder
function fetchContent() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        //checking the response, display error message if not
        if (!response.ok) {
            throw new Error("Error: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        //Get the main content conatiner element
        let container = document.getElementById("main-container");
        //Clear the consisiting content in the container
        container.innerHTML = "";

        //Increment the limit by 6 every time new content loads
        limit += 6;

        let i = 1;
        //Loop through the array returned by the API
        for (post of posts) {
            if (i <= limit && i < 100) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;

                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);

                //Insert div every third post to ensure proper layout
                if (i % 3 == 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
            }
            i++;
        }
    })
}

window.onscrollend = function() {fetchContent();};

