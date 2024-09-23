const words = [
  'carry', 'shalt', 'fudge', 'treat', 'upper', 'spade'
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].toUpperCase();
}