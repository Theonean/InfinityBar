var bubbleSpeed = 1;
var coneAngle = 45; // in degrees
let bubbleDelay = 200;
let bubbleIntervalId;

function addBubble() {
  const bubblepopper = document.getElementById("bubbleshooter");
  const newDiv = document.createElement("div");
  newDiv.className = "bubble";
  newDiv.id = Math.random() * 1000 + Math.random() * 10;
  newDiv.style.left += 30 + '%';
  newDiv.style.top += 40 + '%';

  // Calculates a random direction within the cone angle
  let angle = Math.random() * coneAngle - (coneAngle / 2);
  let velx = Math.sin(angle * Math.PI / 180);
  let vely = -Math.cos(angle * Math.PI / 180);
  let velMag = Math.sqrt(velx ** 2 + vely ** 2);
  let normalizedVel = [velx / velMag, vely / velMag];

  // Sets the velocity of the bubble in the chosen direction
  newDiv.style.setProperty("--velx", normalizedVel[0] * bubbleSpeed);
  newDiv.style.setProperty("--vely", normalizedVel[1] * bubbleSpeed);
  newDiv.style.top = 1 + 'px';
  newDiv.style.left = -1 + 'px';

  // Add event listener to detect when the animation has finished and remove the bubble
  newDiv.addEventListener('animationend', () => {
    // Code to run when the animation has finished
    newDiv.remove();
  });

  newDiv.addEventListener("mouseover", function () { popBubble(newDiv) });
  bubblepopper.appendChild(newDiv);
}

function popBubble(bubblediv) {
  playSoundFile('./sounds/bubblePop.mp3');
  bubblediv.remove();
}

// Function to start or restart the interval with a new delay
function startBubbleInterval() {
  if (bubbleIntervalId) {
    clearInterval(bubbleIntervalId); // Clear existing interval
  }
  bubbleIntervalId = setInterval(addBubble, bubbleDelay);
}

function stopBubbleInterval() {
  if (bubbleIntervalId) {
    clearInterval(bubbleIntervalId); // Clear existing interval
    bubbleIntervalId = "";
  }
}