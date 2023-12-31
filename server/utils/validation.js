function sanitize(obj) {
  Object.keys(obj).forEach((key) => obj[key] === null && delete obj[key]);
  return obj;
}

module.exports = {
  sanitize,
};
