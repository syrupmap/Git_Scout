let article;

if (window.location.hostname === "developer.chrome.com") {
    article = document.querySelector("article");
} else if (window.location.hostname === "en.wikipedia.org") {
    article = document.querySelector(".mw-content-container");
}

function renderReadingTime(article){
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount/200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
    
}
renderReadingTime(article);

const devsite = document.querySelector("devsite-content");

if (devsite){
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations){
            for (const node of mutation.addedNodes) {
                if (node instanceof Element && node.tagName === 'ARTICLE'){
                    renderReadingTime(node);
                }
            }
        }
    });

     observer.observe(devsite, {
        childList: true
    });
}