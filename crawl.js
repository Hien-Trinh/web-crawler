function normalizeURL(url_string) {
  const url = new URL(url_string);
  return url.hostname + url.pathname.replace(/\/$/, "");
}

export { normalizeURL };
