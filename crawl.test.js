import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("normalizeURL protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
    const input = "https://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
    const input = "http://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
    const htmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path">Link</a>
                <a href="https://blog.boot.dev/path2">Link2</a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = [
        "https://blog.boot.dev/path",
        "https://blog.boot.dev/path2",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
    const htmlBody = `
        <html>
            <body>
                <a href="/path">Link</a>
                <a href="/path2">Link2</a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = [
        "https://blog.boot.dev/path",
        "https://blog.boot.dev/path2",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML mixed", () => {
    const htmlBody = `
        <html>
            <body>
                <a href="/path">Link</a>
                <a href="https://blog.boot.dev/path2">Link2</a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = [
        "https://blog.boot.dev/path",
        "https://blog.boot.dev/path2",
    ];
    expect(actual).toEqual(expected);
});
