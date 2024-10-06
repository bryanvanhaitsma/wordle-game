export async function getRandomWord() {
  const response = await fetch('/words.csv');
  const data = await response.text();
  const words = data.split('\n').map(line => line.trim());
  const randomIndex = Math.floor(Math.random() * words.length);
  const selectedWord = words[randomIndex].toUpperCase();
  return selectedWord
}

export async function isValidWord(testWord) {
  const response = await fetch('/words.csv');
  const data = await response.text();
  const words = data.split('\n').map(line => line.trim());
  const testResult = words.includes(testWord.toLowerCase());
  return testResult;
}