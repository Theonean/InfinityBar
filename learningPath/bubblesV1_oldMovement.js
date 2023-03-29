var bubbleSpeed = 0.4;


//AI fixed this function 5x 

//this movement is done with direct DOM Manipulation which is the least effective kind of movement
//
function moveBubbles() {
    // Get all bubbles with class "bubble"
    const bubbles = document.querySelectorAll(".bubble");
    // Loop through all bubbles and move them
    bubbles.forEach((bubble) => {
        let velx = parseFloat(bubble.dataset.velx) - 0.5;
        let vely = parseFloat(bubble.dataset.vely) - 0.5;
        let velMag = Math.sqrt(velx ** 2 + vely ** 2);
        let normalizedVel = [velx / velMag, vely / velMag];
        let speed = normalizedVel.map(v => v * bubbleSpeed);
        let left = parseFloat(bubble.style.left);
        let top = parseFloat(bubble.style.top);
        bubble.style.left = `${left + speed[0]}%`;
        bubble.style.top = `${top + speed[1]}%`;

        //delete not anymore visible bubbles, FOR THE RAM
        if ((!isInViewport(bubble)) || left > 100 ) {
            const element = document.getElementById(bubble.id);
            console.log("removing bubble");
            element.remove();

        }
    });
}

function addBubble() {

    const bubblepopper = document.getElementById("bubblepopper");
    const newDiv = document.createElement("div");
    newDiv.className = "bubble";
    newDiv.id = Math.random() * 1000 + Math.random() * 10;
    newDiv.dataset.velx = Math.random();
    newDiv.dataset.vely = Math.random();
    //console.log(newDiv.id);
    newDiv.style.left += 50 + '%';
    newDiv.style.top += 50 + '%';
    newDiv.addEventListener("mouseover", function () { popBubble(newDiv) })
    //console.log("added bubble No" + bubbles.length);
    bubblepopper.appendChild(newDiv);
}

function popBubble(bubblediv) {
    bubblediv.remove();
}
