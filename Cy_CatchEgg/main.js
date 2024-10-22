const gameContainer = document.querySelector(".game-container");
const basket = document.querySelector(".basket");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let egg;
let fallingInterval;
let fallingSpeed = 30;

function createEgg() {
  egg = document.createElement("div");
  egg.classList.add("egg");

  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  egg.innerText = randomLetter;
  const minLeft = 20;
  const maxLeft = gameContainer.offsetWidth - 60;
  egg.style.left = Math.random() * (maxLeft - minLeft) + minLeft + "px";
  gameContainer.appendChild(egg);

  fallEgg(egg);
}

function fallEgg(egg) {
  let eggTop = 0;
  fallingInterval = setInterval(() => {
    eggTop += 5;
    egg.style.top = eggTop + "px";

    if (
      eggTop + egg.offsetHeight >=
      gameContainer.offsetHeight - basket.offsetHeight
    ) {
      const eggRect = egg.getBoundingClientRect();
      const basketRect = basket.getBoundingClientRect();

      if (
        eggRect.left >= basketRect.left &&
        eggRect.right <= basketRect.right
      ) {
        clearInterval(fallingInterval);
        gameContainer.removeChild(egg);
        score++;
        updateScore();
        increaseFallingSpeed();
        createEgg();
      } else if (eggTop + 50 >= gameContainer.offsetHeight) {
        clearInterval(fallingInterval);
        gameContainer.removeChild(egg);
        createEgg();
      }
    }
  }, fallingSpeed);
}
function increaseFallingSpeed() {
  if (fallingSpeed > 5) {
    fallingSpeed -= 2;
  }
}
function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
}

document.addEventListener("keydown", (e) => {
  const basketLeft = parseInt(
    window.getComputedStyle(basket).getPropertyValue("left")
  );

  if (egg && e.key.toUpperCase() === egg.innerText) {
    basket.style.left = egg.style.left;
  }
});

basket.style.left =
  gameContainer.offsetWidth / 2 - basket.offsetWidth / 2 + "px";
createEgg();
