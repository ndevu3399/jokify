// Selecting elements
const contentDisplay = document.getElementById("content");
const loadingMessage = document.getElementById("loading");
const copyButton = document.getElementById("copy-btn");

// API URLs
const apis = {
    jokeAPI: "https://v2.jokeapi.dev/joke/Any?type=single",
    dadJoke: "https://icanhazdadjoke.com/",
    kanyeQuote: "https://api.kanye.rest/",
    randomQuote: "https://api.quotable.io/random"
};


async function fetchContent(apiUrl, headers = {}) {
    try {
        
        loadingMessage.style.display = "block";
        contentDisplay.classList.remove("show");

        const response = await fetch(apiUrl, headers);
        const data = await response.json();

        
        let contentText = "";
        if (apiUrl.includes("jokeapi")) {
            contentText = data.joke;
        } else if (apiUrl.includes("icanhazdadjoke")) {
            contentText = data.joke;
        } else if (apiUrl.includes("kanye.rest")) {
            contentText = `"${data.quote}" - Kanye West`;
        } else if (apiUrl.includes("quotable.io")) {
            contentText = `"${data.content}" - ${data.author}`;
        }

        
        contentDisplay.textContent = contentText;
        setTimeout(() => contentDisplay.classList.add("show"), 100);

        
        loadingMessage.style.display = "none";

    } catch (error) {
        console.error("Error fetching data:", error);
        contentDisplay.textContent = "Oops! Something went wrong. Try again.";
        loadingMessage.style.display = "none";
    }
}


copyButton.addEventListener("click", () => {
    const text = contentDisplay.textContent;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => copyButton.textContent = "Copy", 1500);
        });
    }
});

document.getElementById("joke-btn").addEventListener("click", () => fetchContent(apis.jokeAPI));
document.getElementById("dad-joke-btn").addEventListener("click", () => fetchContent(apis.dadJoke, { headers: { "Accept": "application/json" } }));
document.getElementById("kanye-btn").addEventListener("click", () => fetchContent(apis.kanyeQuote));
document.getElementById("quote-btn").addEventListener("click", () => fetchContent(apis.randomQuote));
