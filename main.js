import { normalizeURL, getURLsFromHTML } from "./crawl.js";

getURLsFromHTML(normalizeURL("https://blog.boot.dev/path"));
