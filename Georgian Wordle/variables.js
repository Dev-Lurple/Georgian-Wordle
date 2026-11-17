const wordRow = 6;
const wordCol = 5;

const wordGap = 8;

const gameW = wordRow * 100;
const gameH = (wordCol * 100) - wordGap;

const CONFETTI_COUNT = 10;
const confetti_stagger_time = 100;

let currentRow = 0;
let currentCol = 0;
const tiles = [];

const keyMap = new Map();
const KEY_RANK = { absent: 1, present: 2, correct: 3 };

const keySize = 60;

const keyboardW = gameW * 1.5;
const keyboardH = gameH / 2;

const keyboardKeys = [
    "ქ", "წ", "ე", "რ", "ღ", "ტ",
    "თ", "ყ", "უ", "ი", "ო", "პ",
    "ჭ", "შ", "ა", "ს", "დ", "ფ",
    "გ", "ჰ", "ჯ", "ჟ", "კ", "ლ",
    "", "ზ", "ძ", "ხ", "ც", 
    "ჩ", "ვ", "ბ", "ნ", "მ", "Enter"
];

const enToGeMapping = {
  'a': 'ა', 'b': 'ბ', 'g': 'გ', 'd': 'დ', 'e': 'ე', 'v': 'ვ', 'z': 'ზ',
  'T': 'თ', 'i': 'ი', 'k': 'კ', 'l': 'ლ', 'm': 'მ', 'n': 'ნ', 'o': 'ო',
  'p': 'პ', 'J': 'ჟ', 'r': 'რ', 's': 'ს', 't': 'ტ', 'u': 'უ', 'f': 'ფ',
  'q': 'ქ', 'R': 'ღ', 'y': 'ყ', 'S': 'შ', 'C': 'ჩ', 'c': 'ც', 'Z': 'ძ',
  'w': 'წ', 'W': 'ჭ', 'x': 'ხ', 'j': 'ჯ', 'h': 'ჰ'
};
