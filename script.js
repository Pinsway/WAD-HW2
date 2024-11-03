/**
 * Utility function which creates the post-container DOM element from given data
 * @param {Object} post - specifies the json post object 
 * @returns a parent DOM element for given post
 */
function createPostElement(post) {
    let parent = document.createElement('div');
    parent.classList.add("post-container");
    parent.id = "post-" + post.id;

    // let's create the post header
    let header = document.createElement("header");
    header.innerHTML += `
    <a href="/WAD-HW2/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" class="bi bi-person-circle profile" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
    </a>
    `;
    let timestamp = document.createElement("time");
    let date = new Date(post.created_at)
    timestamp.innerText = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    header.appendChild(timestamp);

    // the actual post content
    let postContent = document.createElement("div");
    postContent.classList.add("post-content");

    // add image elements if present
    if (post['image_path'] !== undefined) {
        let postImgPreview = document.createElement("div");
        postImgPreview.classList.add("post-img-preview");

        let previewTarget = document.createElement("a");
        previewTarget.setAttribute("href", post.image_path);
        previewTarget.setAttribute("target", "_blank")

        let thumbnailPath = post.image_path.replace('^(\/WAD-HW\d\/img)\/([A-Za-z0-9_\-]+)\.(jpg|png|gif)$', '$1/thumbnails/$2_s\.$3')
        let thumbnailElement = document.createElement("img");
        thumbnailElement.setAttribute("src", thumbnailPath);
        thumbnailElement.setAttribute("alt", "Image");
        previewTarget.appendChild(thumbnailElement);
        postImgPreview.appendChild(previewTarget);
        postContent.appendChild(postImgPreview);
    }

    // add the actual post message
    let postMessage = document.createElement("div");
    postMessage.classList.add("post-message");
    let postMessageContent = document.createElement("p");
    postMessageContent.innerText += post.content;
    postMessage.appendChild(postMessageContent);
    postContent.appendChild(postMessage);

    parent.appendChild(header);
    parent.appendChild(postContent);
    parent.innerHTML += `
    <div class="post-stats">
        <button class="btn-transparent">
            <img src="/WAD-HW2/img/thumbs-up.svg" alt="Like" height="32" width="32">
        </button>
    </div>
    `;
    return parent;
}

/**
 * Retrieves data about posts from a remote JSON file
 */
async function getData() {
    // const url = "https://api.jsonbin.io/v3/b/672799c5acd3cb34a8a1de6b"
    const url = "/WAD-HW2/contents.JSON"
    await fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error("HTTP error " + resp.status)
            }
            return resp.json()
        })
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                let post = json[i];
                let postsDiv = document.getElementById("posts");
                postsDiv.appendChild(createPostElement(post))
            }
        })
}