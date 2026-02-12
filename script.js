// ── Screens ──────────────────────────────────────────────
const waldoScreen = document.getElementById('waldo-screen');
const letterScreen = document.getElementById('letter-screen');
const questionScreen = document.getElementById('question-screen');
const celebrateScreen = document.getElementById('celebrate-screen');

// ── Elements ─────────────────────────────────────────────
const sceneContainer = document.getElementById('sceneContainer');
const foundFlash = document.getElementById('foundFlash');
const continueBtn = document.getElementById('continueBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// ── Helpers ──────────────────────────────────────────────
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// ── Build the busy Valentine scene ───────────────────────
// Clutter emojis — lots of Valentine-themed items
const clutterEmojis = [
  '❤️','💕','💖','💗','💘','💝','💞','💓','💟',
  '🌹','🌸','🌺','🌷','🌻','🍫','🍬','🍭','🎀',
  '🎁','💐','🧸','🎈','🎉','🎊','✨','⭐','🦋',
  '🐝','🐞','🌈','☁️','🍰','🧁','🍪','🍩','🎵',
  '🎶','🕊️','👑','💎','🔔','🕯️','🥂','💄',
  '👠','🎭','🏹','💫','🪄','🫧','🩷'
];

// Panda + heart combos for the wandering pandas
const pandaCombos = ['🐼💕','🐼❤️','🐼💖','🐼💗','🐼🩷'];

const W = window.innerWidth;
const H = window.innerHeight;

// Place a grid of random clutter to fill the screen densely
const ITEM_COUNT = 200;

for (let i = 0; i < ITEM_COUNT; i++) {
  const el = document.createElement('span');
  el.className = 'scene-item';
  el.textContent = clutterEmojis[Math.floor(Math.random() * clutterEmojis.length)];
  el.style.left = rand(2, 96) + '%';
  el.style.top = rand(5, 95) + '%';
  el.style.fontSize = rand(16, 42) + 'px';
  el.style.opacity = rand(0.45, 1);
  el.style.transform = `rotate(${rand(-30, 30)}deg)`;
  // slight random animation delay for liveliness
  el.style.animation = `pandaWobble ${rand(2.5, 5)}s ease-in-out ${rand(0, 2)}s infinite alternate`;
  sceneContainer.appendChild(el);
}

// Add a handful of pandas with hearts scattered in the scene
const PANDA_COUNT = 12;
for (let i = 0; i < PANDA_COUNT; i++) {
  const p = document.createElement('span');
  p.className = 'scene-panda';
  p.textContent = pandaCombos[Math.floor(Math.random() * pandaCombos.length)];
  p.style.left = rand(5, 90) + '%';
  p.style.top = rand(10, 88) + '%';
  p.style.fontSize = rand(24, 40) + 'px';
  p.style.animationDelay = rand(0, 3) + 's';
  p.style.animationDuration = rand(2.5, 4.5) + 's';
  sceneContainer.appendChild(p);
}

// ── Place the hidden letter ──────────────────────────────
// The letter should look like just another clutter item — a small envelope
const hiddenLetter = document.createElement('span');
hiddenLetter.className = 'hidden-letter';
hiddenLetter.textContent = '✉️';
// Random but not too close to edges or the hint bar
hiddenLetter.style.left = rand(10, 85) + '%';
hiddenLetter.style.top = rand(20, 85) + '%';
hiddenLetter.style.transform = `rotate(${rand(-20, 20)}deg)`;
sceneContainer.appendChild(hiddenLetter);

// ── Hidden letter click → open invitation ────────────────
hiddenLetter.addEventListener('click', () => {
  // Flash effect
  foundFlash.classList.add('active');
  setTimeout(() => {
    showScreen(letterScreen);
    foundFlash.classList.remove('active');
  }, 600);
});

// ── Continue to question ─────────────────────────────────
continueBtn.addEventListener('click', () => {
  showScreen(questionScreen);
});

// ── "No" button – dodges the cursor ─────────────────────
let noClickCount = 0;

noBtn.addEventListener('mouseenter', () => {
  moveNoButton();
});

noBtn.addEventListener('click', () => {
  noClickCount++;
  moveNoButton();

  // Grow the Yes button each time
  const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = Math.min(currentSize + 4, 48) + 'px';
  yesBtn.style.padding = `${16 + noClickCount * 2}px ${48 + noClickCount * 6}px`;
});

function moveNoButton() {
  const padding = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  const randomX = padding + Math.random() * maxX;
  const randomY = padding + Math.random() * maxY;

  noBtn.style.position = 'fixed';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
  noBtn.style.zIndex = '100';
}

// ── "Yes" button – celebration! ──────────────────────────
yesBtn.addEventListener('click', () => {
  showScreen(celebrateScreen);
  launchConfetti();
});

// ── Confetti burst ───────────────────────────────────────
function launchConfetti() {
  const colors = ['#e91e63', '#f44336', '#ff5722', '#ff9800', '#ffeb3b',
                  '#8bc34a', '#03a9f4', '#9c27b0', '#fff', '#f48fb1'];

  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i < 60; i++) {
        createConfettiPiece(colors);
      }
    }, wave * 700);
  }
}

function createConfettiPiece(colors) {
  const piece = document.createElement('div');
  piece.classList.add('confetti');
  piece.style.left = Math.random() * 100 + '%';
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.width = (6 + Math.random() * 10) + 'px';
  piece.style.height = (6 + Math.random() * 10) + 'px';
  piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
  const duration = 2 + Math.random() * 3;
  piece.style.animationDuration = duration + 's';
  piece.style.animationDelay = Math.random() * 0.5 + 's';
  document.body.appendChild(piece);
  setTimeout(() => piece.remove(), (duration + 0.5) * 1000);
}
