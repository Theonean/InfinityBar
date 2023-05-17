
/*
Here I was trying to incorporate the panning of the page
and the placing of the new tiles / parts of the bar 
into the same functionality.
However that didnt work as I couldnt seem to get the coordinate stuff into
grips
which is why I am trying a modular approach with a separate script that looks for the 
users view rect
*/
let isDown = false;
let startX, startY, initialOffsetX, initialOffsetY;
let wrapper;
const tileSize = 32;

function loadMouseStuff() {
    wrapper = document.getElementById('wrapper');

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        startY = e.pageY;
        initialOffsetX = wrapper.offsetLeft;
        initialOffsetY = wrapper.offsetTop;
    });

    wrapper.addEventListener('mouseleave', () => {
        //load data from bardata.js into website
        loadinteractables();
        isDown = false;
    });

    wrapper.addEventListener('mouseup', () => {
        //load data from bardata.js into website
        loadinteractables();
        isDown = false;
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const y = e.pageY;
        const walkX = (x - startX);
        const walkY = (y - startY);
        const newLeft = initialOffsetX + walkX;
        const newTop = initialOffsetY + walkY;

        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';

        updateViewPosition(newLeft, newTop);
    });
}

// set initial values for max rendered positions
let maxRendered = {
    left: 200,
    right: 0,
    up: 0,
    down: 0
};

// set initial values for max positions
let maxLeft = 200;
let maxRight = 0;
let maxUp = 0;
let maxDown = 0;

function updateViewPosition(newLeft, newTop) {

    // check if max values have changed
    if (newLeft > maxLeft) {
        let diff = newLeft - maxRendered.left;
        maxLeft = newLeft;
        console.log("max:" + maxLeft);
        let width = Math.floor(diff / tileSize);
        let midX = maxRendered.left - (((width) / 2) * tileSize);
        console.log("Moved further to the left");
        if (width > 0) {

            console.log("Drawing to the left at:[" + midX + "|" + initialOffsetY + "] width: " + width);
            // add tiles to the left
            tileArea(-midX, 32 * 7, width, 8, tileSize, "wallTile");
            maxRendered.left += width * tileSize;
        }
    }
    if (newLeft < maxRight) {
        let diff = maxRendered.right - newLeft;
        maxRight = newLeft;
        console.log("max:" + maxRight);
        let width = Math.floor(diff / tileSize);
        let midX = maxRendered.right + (((width) / 2) * tileSize - 400);
        console.log("Moved further to the right");
        if (width > 0) {

            console.log("Drawing to the right at:[" + midX + "|" + initialOffsetY + "] width: " + width);
            // add tiles to the right
            tileArea(-midX, 32 * 7, width, 8, tileSize, "wallTile");
            maxRendered.right -= width * tileSize;
        }
    }
    if (newTop > maxUp) {
        let diff = newTop - maxRendered.up;
        maxUp = newTop;
        console.log("max:" + maxUp);
        let height = Math.floor(diff / tileSize);
        let width = Math.floor((maxRendered.left - maxRendered.right) / 32);
        let midY = maxRendered.up - (((height) / 2) * tileSize) + 256;
        console.log("Moved further up");
        if (height > 0) {

            console.log("Drawing to the top at:[" + initialOffsetX + "|" + midY + "] height: " + height);
            // add tiles to the top
            tileArea(initialOffsetX, -midY, width, height, tileSize, "roofTile");
            maxRendered.up += height * tileSize;
        }
    }
    if (newTop < maxDown) {
        let diff = maxRendered.down - newTop;
        maxDown = newTop;
        console.log("max:" + maxDown);
        let height = Math.floor(diff / tileSize);
        let midY = maxRendered.down + (((height) / 2) * tileSize);
        console.log("Moved further down");
        if (height > 0) {

            console.log("Drawing to the bottom at:[" + initialOffsetX + "|" + midY + "] height: " + height);
            // add tiles to the bottom
            tileArea(initialOffsetX, midY, 20, height, tileSize, "undergroundDirt");
            maxRendered.down -= height * tileSize;
        }
    }
}
