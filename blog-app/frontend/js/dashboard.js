const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

async function loadPosts() {
    const res = await fetch("/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await res.json();
    console.log(posts); // Debugging line to check the API response

    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = posts.map(post => `
        <div>
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <button onclick="editPost('${post._id}')">Edit</button>
            <button onclick="deletePost('${post._id}')">Delete</button>
        </div>
    `).join("");
}

function editPost(id) {
    window.location.href = `edit.html?id=${id}`;
}


document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
        document.getElementById("post-form").reset(); // Clear form after submission
        await loadPosts(); // Ensure posts refresh after creation
    } else {
        console.error("Error creating post");
    }
});


async function deletePost(id) {
    await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    loadPosts();
}

loadPosts();
