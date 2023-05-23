
var isPanning = false;

function initialize() {
    //FRUITS
    //setInterval(addfruits, 3000);
    loadMouseStuff();
    //BUBBLES
    startBubbleInterval();
    setInterval(updatemap, 200);
    //setInterval(moveBubbles, 40);

    // Call the lazyLoadElements function on page load and scroll events
    window.addEventListener('DOMContentLoaded', lazyLoadElements);
    window.addEventListener('scroll', lazyLoadElements);

    let tileSize = 32;
    let width = 17;
    let rows = 4;
    let yOffset = 32;

    //create initial rooftiles
    tileArea(1920 / 6, -32, width, rows, tileSize, "roofTile");

    //create floor
    tileArea(1920 / 6, 32 * 11, width, 1, tileSize, "floorTile");



    //load data from bardata.js into website
    loadinteractables();

    //global mouse variables
    var mouseX = 0;
    var mouseY = 0;

    //set barkeepers eyes to follow mouse
    var eye1 = document.getElementById("eye1");
    var pupil1 = document.getElementById("pupil1");

    var eye2 = document.getElementById("eye2");
    var pupil2 = document.getElementById("pupil2");

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        movePupil(mouseX, mouseY, eye1, pupil1);
        movePupil(mouseX, mouseY, eye2, pupil2);
    });

    // Start the animation
    requestAnimationFrame(animate);
}

function tileArea(midX, midY, width, rows, tileWidth, className) {
    //add tiles to json 
    for (let iY = 0; iY < rows; iY++) {
        for (let iX = -width / 2; iX < width / 2; iX++) {
            bardata.push(
                {
                    "parent": "bgTiles",
                    "prefferedStartDir": 2,
                    "endPos": [iX * tileWidth + midX, -iY * tileWidth + midY],
                    "id": "roofTile" + iY * width + iX,
                    "className": className
                });
        }
    }
}

function movePupil(mouseX, mouseY, eye, pupil) {
    const eyeRect = eye.getBoundingClientRect();
    const pupilRect = pupil.getBoundingClientRect();
    const eyeX = eyeRect.left + (eyeRect.width / 2);
    const eyeY = eyeRect.top + (eyeRect.height / 2);
    const deltaX = mouseX - eyeX;
    const deltaY = mouseY - eyeY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100; // maximum distance from center of eye
    const maxAngle = 360; // maximum angle of movement in degrees

    // pupil needs to be moved towards mouse cursor within the circular area
    const angle = Math.atan2(deltaY, deltaX);
    const clampedAngle = Math.min(Math.max(angle, -maxAngle / 180 * Math.PI), maxAngle / 180 * Math.PI);
    const newX = Math.cos(clampedAngle) * maxDistance;
    const newY = Math.sin(clampedAngle) * maxDistance;
    pupil.style.left = (eyeRect.width / 2) + (newX / maxDistance * 10) + 'px';
    pupil.style.top = (eyeRect.height / 2) + (newY / maxDistance * 10) + 'px';

}

//https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function lazyLoadElements() {
    const elements = wrapper.querySelectorAll('.lazy-load');

    elements.forEach((element) => {
        if (isInViewport(element)) {
            // Add logic here to load the element's content or perform any necessary actions
            element.classList.remove('lazy-load'); // Remove the lazy-load class to prevent re-evaluation
        }
    });
}