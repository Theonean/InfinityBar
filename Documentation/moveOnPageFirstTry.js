//this approach (merging panning and tileplacing) had to be scraped

let isDown = false;
let startX, startY, initialOffsetX, initialOffsetY;
let maxLeft = 0, maxRight = 0, maxUp = 0, maxDown = 0;

function loadMouseStuff() {
    const wrapper = document.getElementById('wrapper');

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        startY = e.pageY;
        initialOffsetX = wrapper.offsetLeft;
        initialOffsetY = wrapper.offsetTop;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
    });

    wrapper.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const y = e.pageY;
        const walkX = (x - startX);
        const walkY = (y - startY);
        const newLeft = initialOffsetX + walkX;
        const newTop = initialOffsetY + walkY;

        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';

        // update max values and check if they're new maximums
        if (newLeft > maxLeft) {
            maxLeft = newLeft;
            console.log("Moved further to the left");
            // do something
        }
        if (newLeft < maxRight) {
            maxRight = newLeft;
            console.log("Moved further to the right");
            // do something
        }
        if (newTop > maxUp) {
            maxUp = newTop;
            console.log("Moved further up");
            // do something
        }
        if (newTop < maxDown) {
            maxDown = newTop;
            console.log("Moved further down");
            // do something
        }
    });
};
