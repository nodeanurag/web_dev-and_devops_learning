/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/


function countVowels(str) {
  if (typeof str !== "string") return 0;

  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;

  for (const ch of str.toLowerCase()) {
    if (vowels.has(ch)) count++;
  }

  return count;
}

module.exports = countVowels;
// `node cohort-3/Week2/1.JS/medium/Q1.js` in the terminal.
