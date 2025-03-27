const text = document.getElementById("text");
const copyButton = document.getElementById("copy");
const buttons = document.querySelectorAll("button");

document.getElementById("random").addEventListener("click", fetchRandom);
document.getElementById("joke").addEventListener("click", fetchJoke);
document.getElementById("dadJoke").addEventListener("click", fetchDadJoke);
document.getElementById("kanye").addEventListener("click", fetchKanyeQuote);
document.getElementById("inspire").addEventListener("click", fetchInspiringQuote);
copyButton.addEventListener("click", copyToClipboard);

async function fetchRandom() {
    const apis = [fetchJoke, fetchDadJoke, fetchKanyeQuote, fetchInspiringQuote];
    const randomApi = apis[Math.floor(Math.random() * apis.length)];
    await randomApi();
}

async function fetchData(url, processData) {
    try {
        showLoading();
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        processData(data);
    } catch (error) {
        text.innerText = "Oops! Something went wrong. Try again!";
        console.error(error);
    } finally {
        hideLoading();
    }
}

async function fetchJoke() {
    fetchData("https://v2.jokeapi.dev/joke/Any?type=single", data => {
        text.innerText = data.joke;
    });
}

async function fetchDadJoke() {
    fetchData("https://icanhazdadjoke.com/", data => {
        text.innerText = data.joke;
    });
}

async function fetchKanyeQuote() {
    fetchData("https://api.kanye.rest/", data => {
        text.innerText = `"${data.quote}" - Kanye West`;
    });
}

async function fetchInspiringQuote() {
    fetchData("https://api.quotable.io/random", data => {
        text.innerText = `"${data.content}" - ${data.author}`;
    });
}

function copyToClipboard() {
    navigator.clipboard.writeText(text.innerText).then(() => {
        alert("Copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy text.");
    });
}

function showLoading() {
    text.innerText = "Fetching...";
    text.classList.add("loading");
    disableButtons(true);
}

function hideLoading() {
    text.classList.remove("loading");
    disableButtons(false);
}

function disableButtons(state) {
    buttons.forEach(button => button.disabled = state);
}
