module.exports = {
  isLongEnough(field) {
    if (field.length >= 6) {
      return true;
    } else {
      return false;
    }
  },

  areEnglishChars(input) {
    return /^[a-zA-Z]/.test(input);
  },
};
