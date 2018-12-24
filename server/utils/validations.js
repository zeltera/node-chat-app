let isRealString = (str) => {
  return typeof str === 'string' && str.trim();
};

module.exports = { isRealString };
