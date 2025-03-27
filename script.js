document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("content");
    const loadingMessage = document.getElementById("loading");
    const copyButton = document.getElementById("copy-btn");

    const apis = {
        jokeAPI: "https://v2.jokeapi.dev/joke/Any?type=single",
        dadJoke: "https://icanhazdadjoke.com/",
        kanyeQuote: "https://api.kanye.rest/",
        randomQuote: "https://api.quotable.io/random"
    };

    async function fetchContent(apiUrl, options = {}) {
        try {
            // Show loading message
            loadingMessage.style.display = "block";
            contentDisplay.classList.remove("show");
            contentDisplay.textContent = ""; 

            const response = await fetch(apiUrl, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            let contentText = "";
            
            if (apiUrl.includes("jokeapi")) {
                contentText = data.joke || `${data.setup} - ${data.delivery}`;
            } else if (apiUrl.includes("icanhazdadjoke")) {
                contentText = data.joke; // `icanhazdadjoke` sends a `joke` key
            } else if (apiUrl.includes("kanye.rest")) {
                contentText = `"${data.quote}" - Kanye West`;
            } else if (apiUrl.includes("quotable.io")) {
                contentText = `"${data.content}" - ${data.author}`;
            } else {
                contentText = "No content available.";
            }

            contentDisplay.textContent = contentText;

            // Show text smoothly
            setTimeout(() => contentDisplay.classList.add("show"), 100);

        } catch (error) {
            console.error("Error fetching data:", error);
            contentDisplay.textContent = "Oops! Something went wrong. Try again.";
        } finally {
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

    // Event listeners for buttons
    document.getElementById("joke-btn").addEventListener("click", () => fetchContent(apis.jokeAPI));
    document.getElementById("dad-joke-btn").addEventListener("click", () => fetchContent(apis.dadJoke, { headers: { "Accept": "application/json" } }));
    document.getElementById("kanye-btn").addEventListener("click", () => fetchContent(apis.kanyeQuote));
    document.getElementById("quote-btn").addEventListener("click", () => fetchContent(apis.randomQuote));
});
