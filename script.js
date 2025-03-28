const text = document.getElementById("text");
const copyButton = document.getElementById("copy");

document.getElementById("random").addEventListener("click", fetchRandom);
document.getElementById("joke").addEventListener("click", fetchJoke);
document.getElementById("dadJoke").addEventListener("click", fetchDadJoke);
document.getElementById("kanye").addEventListener("click", fetchKanyeQuote);
document.getElementById("inspire").addEventListener("click", fetchInspiringQuote);
copyButton.addEventListener("click", copyToClipboard);

async function fetchRandom() {
    const apis = [fetchJoke, fetchDadJoke, fetchKanyeQuote, fetchInspiringQuote];
    const randomApi = apis[Math.floor(Math.random() * apis.length)];
    randomApi();
}

async function fetchJoke() {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await res.json();
    text.innerHTML = `<span class="joke-text">${data.joke}</span>`;
}

async function fetchDadJoke() {
    const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
    });
    const data = await res.json();
    text.innerHTML = `<span class="joke-text">${data.joke}</span>`;
}

async function fetchKanyeQuote() {
    const res = await fetch("https://api.kanye.rest/");
    const data = await res.json();
    text.innerHTML = `<span class="quote-text">"${data.quote}" - Kanye West</span>`
}

async function fetchInspiringQuote() {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    text.innerHTML = `<span class="quote-text">"${data.content}" - ${data.author}</span>`;
}

function copyToClipboard() {
    navigator.clipboard.writeText(text.innerText);
    alert("Copied to clipboard!");
}
