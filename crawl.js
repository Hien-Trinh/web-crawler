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

async function fetchHTML(url) {
    let res;

    try {
        res = await fetch(url);
    } catch (err) {
        throw new Error(`fetchHTML failed: ${err.message}`);
    }

    if (res.status > 399) {
        throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
    }

    const content_type = res.headers.get("content-type");
    if (!content_type || !content_type.includes("text/html")) {
        throw new Error(
            `Wrong content type: got ${content_type} instead of text/html`,
        );
    }

    return res.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currentURLObject = new URL(currentURL);
    const baseURLObj = new URL(baseURL);

    if (currentURLObject.hostname !== baseURLObj.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);

    if (pages[normalizedURL]) {
        pages[normalizedURL]++;
        return pages;
    }

    pages[normalizedURL] = 1;

    console.log(`Crawling ${currentURL}`);

    let htmlBody = "";
    try {
        htmlBody = await fetchHTML(currentURL);
    } catch (err) {
        console.error(`Failed to fetch ${currentURL}: ${err.message}`);
        return pages;
    }

    const urls = getURLsFromHTML(htmlBody, baseURL);
    for (const url of urls) {
        if (url !== currentURL) {
            await crawlPage(baseURL, url, pages);
        }
    }

    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
