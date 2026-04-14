function fixAPI(url) {
  return url.replace("localhost", "127.0.0.1");
}

module.exports = { fixAPI };
