const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadPost() {
    const res = await fetch(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const post = await res.json();
    document.getElementById("edit-title").value = post.title;
    document.getElementById("edit-content").value = post.content;
}

document.getElementById("edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("edit-title").value;
    const content = document.getElementById("edit-content").value;

    const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
        window.location.href = "dashboard.html";
    } else {
        alert("Failed to update post");
    }
});

function goBack() {
    window.location.href = "dashboard.html";
}

loadPost();
 