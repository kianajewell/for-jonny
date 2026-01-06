let currentSection = 1;
const totalSections = 5;

function showSection(number) {
  document
    .getElementById("section" + currentSection)
    .classList.remove("active");

  document
    .getElementById("section" + number)
    .classList.add("active");

  for (let i = 1; i <= totalSections; i++) {
    document.getElementById("dot" + i).classList.remove("active");
  }
  document.getElementById("dot" + number).classList.add("active");

  currentSection = number;
}

function next() {
  if (currentSection < totalSections) {
    const nextSection = currentSection + 1;
    showSection(nextSection);

    // trigger final reveal if the NEXT section is the last card
    if (nextSection === totalSections) {
      triggerFinalReveal();
    }
  }
}

function back() {
  if (currentSection > 1) {
    showSection(currentSection - 1);
  }
}

// generate floating sparkles in the background
const sparkleContainer = document.querySelector('.sparkle-container');
for (let i = 0; i < 40; i++) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.animationDelay = (Math.random() * 6) + 's';
  sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
  sparkleContainer.appendChild(sparkle);
}

// final reveal for last card
function triggerFinalReveal() {
  const container = document.querySelector('.final-sparkle-container');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const isHeart = Math.random() < 0.5;
    const elem = document.createElement('div');

    if (isHeart) {
      elem.className = 'final-heart-confetti';
    } else {
      elem.className = 'final-confetti';
      elem.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 70%)`; // colorful confetti
    }

    // start at center-ish of card
    elem.style.left = '50%';
    elem.style.top = '50%';

    // random pop directions
    const x = (Math.random() - 0.5) * 200; // px
    const y = (Math.random() - 0.5) * -200; // upward
    const fallX = (Math.random() - 0.5) * 50; // drift sideways
    const fallY = Math.random() * 100; // fall downward

    elem.style.setProperty('--x', x + 'px');
    elem.style.setProperty('--y', y + 'px');
    elem.style.setProperty('--fallX', fallX + 'px');
    elem.style.setProperty('--fallY', fallY + 'px');

    // animate
    elem.style.animation = `confettiBurst 2.5s ease forwards`;
    container.appendChild(elem);

    // remove after animation
    setTimeout(() => elem.remove(), 2200);
  }
}

const photoGame = [
  {
    photo: "photo1.jpg",
    question: "What shenanignas were we involved in here?",
    choices: [
      "Gocery shopping",
      "Pushing Kiana in a cart",
      "Shoplifting"
    ],
    correct: 1,
    correctMsg: "You remembered! 💕",
    almostMsg: "Not quite!",
  },
  {
    photo: "photo2.jpg",
    question: "What activity did we do on this day?",
    choices: [
      "Pumpkin carving",
      "A pie eating contest",
      "Giant slides and moonlit maze"
    ],
    correct: 2,
    correctMsg: "You got it! That was so fun!",
    almostMsg: "Nope!",
  },
  {
    photo: "photo3.jpg",
    question: "Where was this photo taken?",
    choices: [
      "A pizza place in Ocean City",
      "An ice cream shop in Mystic",
      "A cozy cafe in Chantilly"
    ],
    correct: 0,
    correctMsg: "Yes! That was such a special night for me.",
    almostMsg: "No but that was great too!",
  },
  {
    photo: "photo4.jpg",
    question: "What did we accomplish this day?",
    choices: [
      "Cooking a new recipe",
      "Building our first lego set",
      "Learned a new dance"
    ],
    correct: 1,
    correctMsg: "Correct. It was epic!",
    almostMsg: "Sounds fun but nope.",
  },
  {
    photo: "photo5.jpg",
    question: "What did we come to see in this picture?",
    choices: [
      "Castles",
      "A lighthouse",
      "A museum"
    ],
    correct: 1,
    correctMsg: "Of course. What a lovely view!",
    almostMsg: "Not quite!",
  }
];

let currentPhoto = 0;

function loadPhoto() {
  const data = photoGame[currentPhoto];

  document.getElementById("game-photo").src = data.photo;
  document.getElementById("game-question").textContent = data.question;

  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach((btn, index) => {
    btn.textContent = data.choices[index];
  });

  document.getElementById("game-feedback").textContent = "";
}

function chooseAnswer(index) {
  const feedback = document.getElementById("game-feedback");
  const data = photoGame[currentPhoto];

  if (index === data.correct) {
  feedback.textContent = data.correctMsg;
  spawnHearts();
} else {
  feedback.textContent = data.almostMsg;
}

  setTimeout(() => {
    currentPhoto++;

    if (currentPhoto < photoGame.length) {
      loadPhoto();
    } else {
      showEnding();
    }
  }, 1400);
}

function spawnHearts() {
  const container = document.querySelector(".photo-game");

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💗";

    heart.style.left = Math.random() * 80 + 10 + "%";
    heart.style.top = "60%";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1500);
  }
}

function showEnding() {
  document.querySelector(".photo-game").innerHTML = `
    <p style="font-size:1.1rem; margin-top:20px;">
      I love you and all of the memories we've made together. Happy Birthday, my love 💚
    </p>

    <button class="replay-btn" onclick="replayGame()">
      Replay 💫
    </button>
  `;
}

function replayGame() {
  currentPhoto = 0;

  document.querySelector(".photo-game").innerHTML = `
    <img id="game-photo" src="" alt="A special memory of us" class="game-photo">

    <div class="choices">
      <button class="choice-btn" onclick="chooseAnswer(0)"></button>
      <button class="choice-btn" onclick="chooseAnswer(1)"></button>
      <button class="choice-btn" onclick="chooseAnswer(2)"></button>
    </div>

    <p class="feedback" id="game-feedback"></p>
  `;

  loadPhoto();
}

document.addEventListener("DOMContentLoaded", () => {
  loadPhoto();
});