const { isValidEmail, isLongEnough, areEnglishChars } = require('../functions');

test('isValidEmail returns true when given a valid email', () => {
  expect(isValidEmail('a@b.hu')).toBeTruthy();
});

test('isValidEmail returns false when given an invalid email', () => {
  expect(isValidEmail('ab.hu')).toBeFalsy();
});

test('isValidEmail returns false when given an empty string', () => {
  expect(isValidEmail('')).toBeFalsy();
});

test('isLongEnough returns true when input is longer than 6 digits', () => {
  expect(isLongEnough('1234567')).toBeTruthy();
});

test('isLongEnough returns false when input is not longer than 6 digit', () => {
  expect(isLongEnough('123')).toBeFalsy();
});

test('isLongEnough returns false when given an empty string', () => {
  expect(isLongEnough('')).toBeFalsy();
});

test('areEnglishChars returns true when only english letters are used', () => {
  expect(areEnglishChars('kutya')).toBeTruthy();
});

test('areEnglishChars returns false when not only english letters are used', () => {
  expect(areEnglishChars('.')).toBeFalsy();
});

test('areEnglishChars returns false when empty string is entered', () => {
  expect(areEnglishChars('')).toBeFalsy();
});
