const textForm = document.getElementById("textForm");
const searchForm = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

// Function to handle text submission
textForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const textInput = document.getElementById("textInput").value;

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzsNxLxE9R3D8aPm7YrN0Hr3NxG9CBSrG6J0QDriAJuQyPycZ9ppjyVV6FjDLZPM2wM/exec", {
            method: "POST",
            body: JSON.stringify({ action: "add", text: textInput }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        alert(result.success ? "Text saved successfully!" : "Failed to save text.");
    } catch (error) {
        alert("Error connecting to server.");
    }
});

// Function to handle text search
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzsNxLxE9R3D8aPm7YrN0Hr3NxG9CBSrG6J0QDriAJuQyPycZ9ppjyVV6FjDLZPM2wM/exec", {
            method: "POST",
            body: JSON.stringify({ action: "search", query: searchInput }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
            const rows = result.data;
            resultsDiv.innerHTML = rows.length
                ? `<ul>${rows.map(row => `<li>${row}</li>`).join("")}</ul>`
                : "No results found.";
        } else {
            resultsDiv.textContent = "Failed to fetch results.";
        }
    } catch (error) {
        resultsDiv.textContent = "Error connecting to server.";
    }
});
