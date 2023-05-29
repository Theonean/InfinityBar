function loadinteractables() {
    console.log("Loadinteractables called, building bardata...");
    var LoadType = "Chaos";//Math.random() > 0.5 ? "Chaos" : "Satisfying"; //"Satisfying" is the other option, temporary before ui is created for chaos or satisfying mode
    bardata.forEach((barPiece) => {
        if (LoadType === "Chaos") {
            //CHAOS Spawns elements from random directions
            barElement.create(barPiece, DirectionGod.getRandomDirection(), "slidein_barElement");
        }
        else if (LoadType === "Satisfying") {
            //SATISFYING makes elements slide into possition gracefully by making them move in only one direction from the preferred direction
            barElement.create(barPiece, barPiece.prefferedStartDir, "spawnInBarElement");
        }
        else if (LoadType === "Centered") {
            //SATISFYING makes elements slide into possition gracefully by making them move in only one direction from the preferred direction
            barElement.create(barPiece, "Centered");
        }
    });
    /*
        spawnBottles(4, DirectionGod.getDirectionAtIndex(3), 32, [50, 100]);
        const bubbleshooter = barElement.create("wrapper", DirectionGod.getRandomDirection(), [67, 182], "bubbleshooter");
        */
    bardata = [];
}

function spawnBottles(amount, creationDirection, pixelOffset, startSpawnPoint) {
    for (let index = 0; index < amount; index++) {
        switch (creationDirection) {
            case DirectionGod.getDirectionAtIndex(0):
                startSpawnPoint[1] -= pixelOffset;
                break;
            case DirectionGod.getDirectionAtIndex(1):
                startSpawnPoint[1] += pixelOffset;
                break;
            case DirectionGod.getDirectionAtIndex(2):
                startSpawnPoint[0] -= pixelOffset;
                break;
            case DirectionGod.getDirectionAtIndex(3):
                startSpawnPoint[0] += pixelOffset;
                break;
            default:
                console.error('Invalid direction at spawnbottles');
        }
        const bottle = barElement.create("wall", DirectionGod.getRandomDirection(), startSpawnPoint, "bottle" + index, "bottle");
    }
}

/**
 * Manages the direction enum
 * can either get a random direction
 * or a specific one with ints:
 * 0: top, 1: bottom, 2: left, 3: right
 */
class DirectionGod {
    static Direction = {
        TOP: 'top',
        BOTTOM: 'bottom',
        LEFT: 'left',
        RIGHT: 'right'
    };

    static getRandomDirection() {
        const directions = Object.values(this.Direction);
        return directions[Math.floor(Math.random() * directions.length)];
    }

    /**
     * 
     * @param {*} index returns direction corresponding to ints -> 0: up, 1: down, 2: left, 3: right
     * @returns the specific direction enum selected
     */
    static getDirectionAtIndex(index) {
        const directions = Object.values(this.Direction);
        return directions[index % directions.length];
    }

    static getDirectionEnum() {
        return this.Direction;
    }
}

//creates a custom barelement 
class barElement {

    /**
     * 
     * @param {*} className class name to be given to the new div
     * @param {*} parent parent htlm element id that this new div will be attached under
     * @param {*} startDir starting direction for slidein animation from Direction enum
     * @param {*} endPos end position for this element in scene in absolute pixel units with format [int X,int Y] Ex. [100,100]
     */

    static create(barpiece, startDir, animationName = "spawnInBarElement") {

        let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const parentDiv = document.getElementById(barpiece.parent);
        const div = document.createElement('div');
        if (barpiece.className !== null) {
            div.classList.add(barpiece.className);
        }
        div.classList.add("barElement");
        div.id = barpiece.id;

        div.style.setProperty("--animationName", animationName);

        //console.log(startDir);
        const randomPos = randomPosition();
        //console.log(randomPos)
        switch (startDir) {
            case DirectionGod.getDirectionAtIndex(0):
                // set startslideposition in a random position on the top border
                div.style.setProperty("--slideInStartX", `${randomPos[0]}`);
                div.style.setProperty("--slideInStartY", -100 + "%");
                break;
            case DirectionGod.getDirectionAtIndex(1):
                div.style.setProperty("--slideInStartX", `${randomPos[0]}`);
                div.style.setProperty("--slideInStartY", 120 + "%");
                break;
            case DirectionGod.getDirectionAtIndex(2):
                div.style.setProperty("--slideInStartX", -100 + "%");
                div.style.setProperty("--slideInStartY", `${randomPos[1]}`);
                break;
            case DirectionGod.getDirectionAtIndex(3):
                div.style.setProperty("--slideInStartX", 120 + "%");
                div.style.setProperty("--slideInStartY", `${randomPos[1]}`);
                break;
            case "Centered":
                div.style.setProperty("--slideInStartX", (currentViewBorder.left - currentViewBorder.right) / 2);
                div.style.setProperty("--slideInStartY", (currentViewBorder.up - currentViewBorder.down) / 2);
                break;

            default:
                console.error('Invalid direction');
        }

        div.style.setProperty("--slideInEndX", `${barpiece.endPos[0]}px`);
        div.style.setProperty("--slideInEndY", `${barpiece.endPos[1]}px`);
        div.style.accentColor = color;

        parentDiv.appendChild(div);

        // Check if this barPiece has a clickbox property
        if (barpiece.clickbox) {
            for (let index = 0; index < barpiece.clickbox.length; index++) {
                this.addClickbox(div, barpiece.clickbox[index]);
            }
        }

        if(barpiece.onload){
            barpiece.onload(div);
            console.log("ONLOAD");
        }

        return div;
    }

    static addClickbox(div, clickbox) {
        let clickboxDiv;
        // Create a new div that will act as the clickable area
        clickboxDiv = document.createElement('div');

        // Set the position and size of the clickboxDiv according to the clickbox properties
        clickboxDiv.style.position = 'absolute';
        clickboxDiv.style.left = `${clickbox.pos.x}px`;
        clickboxDiv.style.top = `${clickbox.pos.y}px`;
        clickboxDiv.style.width = `${clickbox.size.x}px`;
        clickboxDiv.style.height = `${clickbox.size.y}px`;

        // Set visibility and other properties of the clickboxDiv
        clickboxDiv.style.backgroundColor = clickbox.color;
        clickboxDiv.style.zIndex = '9999'; // any sufficiently high value

        // Add an onclick event listener to the clickboxDiv
        clickboxDiv.addEventListener('click', clickbox.clickReaction);

        // Add the clickboxDiv to the original div
        div.appendChild(clickboxDiv);

        return clickboxDiv;
    }
}

function randomPosition() {
    const randomLeft = Math.floor(Math.random() * 101); // generate random number between 0 and 100
    const randomTop = Math.floor(Math.random() * 101); // generate random number between 0 and 100
    return [`${randomLeft}%`, `${randomTop}%`];
}


