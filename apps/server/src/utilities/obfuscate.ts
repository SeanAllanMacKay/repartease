const characters = "abcdefghijklmnopqrstuvwxyz";

export const obfuscate = (string) => {
  let obfuscatedString = "";

  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") {
      obfuscatedString += " ";
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);

      obfuscatedString += characters[randomIndex];
    }
  }

  return obfuscatedString;
};
