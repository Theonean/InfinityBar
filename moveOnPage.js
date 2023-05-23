//moveOnPage.js
/*
    Panns the bar around when the user presses on it and moves
    also updates the currentviewborder variable in tileMapper.js
*/

let isDown = false;
let startX, startY, initialOffsetX, initialOffsetY;
let wrapper;
const tileSize = 32;

function loadMouseStuff() {
    wrapper = document.getElementById('wrapper');
    const maxOffset = 500; // Maximum offset from the middle

    let isDown = false;
    let startX = 0;
    let startY = 0;
    let initialOffsetX = 0;
    let initialOffsetY = 0;

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
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const y = e.pageY;
        const walkX = x - startX;
        const walkY = y - startY;
        let newLeft = initialOffsetX + walkX;
        let newTop = initialOffsetY + walkY;

        // Limit wrapper offset to stay within 500 pixels from the middle
        const maxOffsetY = Math.min(maxOffset, Math.abs(newTop - window.innerHeight / 2));
        newTop = (newTop < window.innerHeight / 2) ? window.innerHeight / 2 - maxOffsetY/2 : window.innerHeight / 2 + maxOffsetY;

        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';

        // Update currentViewBorder
        currentViewBorder = getCurrentViewBorders();
        //console.log(currentViewBorder);
    });
}

function getCurrentViewBorders() {
    // console.log(window.innerHeight + " Height"); // or
    // console.log(window.innerWidth + " Width"); // or
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset;
    const left = scrollLeft + parseInt(wrapper.style.left);
    const right = -(left - windowWidth);
    const up = scrollTop + parseInt(wrapper.style.top);
    const down = -(up - windowHeight);

    return {
        left,
        right,
        up,
        down,
    };
}
