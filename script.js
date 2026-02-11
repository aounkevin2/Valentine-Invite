// ── Screens ──────────────────────────────────────────────
const envelopeScreen = document.getElementById('envelope-screen');
const letterScreen = document.getElementById('letter-screen');
const questionScreen = document.getElementById('question-screen');
const celebrateScreen = document.getElementById('celebrate-screen');

// ── Elements ─────────────────────────────────────────────
const envelope = document.getElementById('envelope');
const continueBtn = document.getElementById('continueBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// ── Helpers ──────────────────────────────────────────────
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ── Floating hearts background ───────────────────────────
function spawnFloatingHeart() {
  const container = document.getElementById('heartsBg');
  const heart = document.createElement('span');
  heart.classList.add('floating-heart');
  heart.textContent = ['♥', '♡', '❤'][Math.floor(Math.random() * 3)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (16 + Math.random() * 24) + 'px';
  const duration = 6 + Math.random() * 8;
  heart.style.animationDuration = duration + 's';
  heart.style.opacity = 0.3 + Math.random() * 0.4;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(spawnFloatingHeart, 400);

// ── Envelope click ───────────────────────────────────────
envelope.addEventListener('click', () => {
  envelope.classList.add('opened');
  setTimeout(() => showScreen(letterScreen), 800);
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
