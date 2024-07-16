import { JSDOM } from "jsdom";
function normalizeURL(url_string) {
    const url = new URL(url_string);
    return url.hostname + url.pathname.replace(/\/$/, "");
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll("a");

    for (const anchor of anchors) {
        const href = anchor.getAttribute("href");
        if (href) {
            const url = new URL(href, baseURL);
            urls.push(url.href);
        }
    }

    return urls;
}

export { normalizeURL, getURLsFromHTML };
