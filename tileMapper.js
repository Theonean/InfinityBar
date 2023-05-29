//maps the required tiles
//looks at user view rect and last rendered stuffz
// set initial values for max rendered positions
let maxRendered = {
    left: 0,
    right: 0,//1664,
    up: 0,
    down: 0//384
};

//updated my moveonpage.js but used here
let currentViewBorder = {
    left: 0,
    right: 0,
    up: 0,
    down: 0
};

let arcadesMaxRendered = {
    currentLeft: -500,
    renderedLeft: -500,
    currentRight: 0,
    renderedRight: 0
};

const Directions = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    DOWN: 'down'
};

let floorY = 32 * 9;
let wallY = 32 * 6 - 192;

// Set the desired distance between arcades
const arcadeDistance = 1012;

//call updatemap every 0.2 seconds
function updatemap() {
    //iterate from 0 to 3 for all 4 directions
    for (let index = 0; index < 4; index++) {
        //Gets the string key index for the objects
        let currentDirectionIndex = parseIndexToDirection(index);

        //Int values for distance from center 
        let currentBorderView = currentViewBorder[currentDirectionIndex];
        let currentBorderRenderedMax = maxRendered[currentDirectionIndex];
        let diff = currentBorderRenderedMax - currentBorderView;

        /*
        console.log("updating for direction: " + currentDirectionIndex);
        console.log("view max: " + currentBorderView);
        console.log("render max: " + currentBorderRenderedMax);
        console.log("difference: " + diff);
*/
        //If diff is smaller than 0, place tiles and update rendered area
        if (diff < 0) {
            let width = Math.abs(Math.floor(diff / tileSize));
            width += width % 2; //rounds the value up to a round number divisible by 2
            let midX;
            let midY;
            //sets new maxrender position with width
            maxRendered[currentDirectionIndex] = currentBorderRenderedMax + (width * 32);

            //do i really still need the switch?
            switch (currentDirectionIndex) {
                case "left":
                case "right":
                    midX = currentBorderRenderedMax + (width * 32 / 2);
                    midX = (currentDirectionIndex === "left") ? midX * -1 : midX;

                    console.log("Drawing floor at[" + midX + "|" + floorY + "]");
                    //create floor
                    tileArea(midX, floorY, width, 1, tileSize, "floorTile");

                    console.log("Drawing wall at[" + midX + "|" + wallY + "]");
                    //create wall
                    tileArea(midX, wallY, width, 1, tileSize, "wallTile");

                    //create roof // sky
                    midY = -32 * 2;
                    console.log("Drawing roof left at[" + midX + "|" + midY + "]");
                    //create roof side box
                    tileArea(midX, midY, width, 4, tileSize, "roofTile");

                    //create underground
                    midY = 32 * 24;
                    console.log("Drawing roof left at[" + midX + "|" + midY + "]");
                    //create underground dirt
                    tileArea(midX, midY, width, 12, tileSize, "undergroundDirt");
                    
                    // add arcades
                    let isLeftDirection = (currentDirectionIndex === "left");
                    let lastArcadePosition = isLeftDirection ? -arcadesMaxRendered.renderedLeft : arcadesMaxRendered.renderedRight;
                    let arcadeDiff = isLeftDirection ? maxRendered[currentDirectionIndex] + lastArcadePosition : maxRendered[currentDirectionIndex] - lastArcadePosition;

                    console.log("lAP: " + lastArcadePosition + " arcDiff: " + arcadeDiff);

                    console.log("Arcade max rendered " + currentDirectionIndex + " pos: " + (isLeftDirection ? arcadesMaxRendered.renderedLeft : arcadesMaxRendered.renderedRight));

                    // Check if the arcade difference is greater than or equal to the arcadeDistance
                    if (arcadeDiff >= arcadeDistance) {
                        // Calculate the number of arcades to be placed
                        let numArcades = Math.floor(arcadeDiff / arcadeDistance);
                        console.log("arcade Diff: " + arcadeDiff);
                        console.log(arcadesMaxRendered);

                        // Place arcades with fixed distance
                        for (let i = 0; i < numArcades; i++) {
                            let posX = isLeftDirection ? lastArcadePosition - arcadeDistance * (i + 1) : lastArcadePosition + arcadeDistance * (i + 1);
                            let clickbox = createArcadeClickbox(interactiveElementNo);
                            //console.log(clickbox);
                            addInteractiveElement(posX, 0, "arcade", clickbox);

                            //Updates maxrendered depending on direction
                            isLeftDirection ? arcadesMaxRendered.renderedLeft += arcadeDistance : arcadesMaxRendered.renderedRight += arcadeDistance;
                        }
                    }

                    //breaks out the switch --> not really needed in this case?
                    break;
            }
        }

        //load data from bardata.js into website
        loadinteractables();
    }
}

function parseIndexToDirection(index) {
    //set the direction from number to string
    switch (index) {
        case 0:
            return currentDirectionIndex = "left";
        case 1:
            return currentDirectionIndex = "right";
        case 2:
            return currentDirectionIndex = "up";
        case 3:
            return currentDirectionIndex = "down";
    }
}

let interactiveElementNo = 0;
function addInteractiveElement(x, y, className, clickbox = "") {
    let newData = {
        "parent": "arcades",
        "prefferedStartDir": 2,
        "endPos": [x, y],
        "id": className + interactiveElementNo,
        "className": className
    };

    if (clickbox !== "") {
        newData["clickbox"] = clickbox; // Add "clickbox" key to newData object
    }

    //add tiles to json 
    bardata.push(newData);

    interactiveElementNo++;
}