function loadinteractables() {
    var chaosOrSatisfying = "Chaos"; //"Satisfying" is the other option, temporary before ui is created for chaos or satisfying mode
    bardata.forEach((barPiece) => {
        if (chaosOrSatisfying === "Chaos") {
            //CHAOS Spawns elements from random directions
            barElement.create(barPiece.parent, DirectionGod.getRandomDirection(), barPiece.endPos, barPiece.id, barPiece.className !== null ? barPiece.className: null);
        }
        else {
            //SATISFYING makes elements slide into possition gracefully by making them move in only one direction from the preferred direction
            barElement.create(barPiece.parent, barPiece.prefferedStartDir, barPiece.endPos, barPiece.id, barPiece.className !== null ? barPiece.className: null);
        }
    });
    /*
        spawnBottles(4, DirectionGod.getDirectionAtIndex(3), 32, [50, 100]);
        const bubbleshooter = barElement.create("wrapper", DirectionGod.getRandomDirection(), [67, 182], "bubbleshooter");
        */
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

    static create(parent, startDir, endPos, id, className = null) {
        const parentDiv = document.getElementById(parent);
        const div = document.createElement('div');
        if (className !== null) {
            div.classList.add(className);
        }
        div.classList.add("barElement");
        div.id = id;

        console.log(className);
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
            default:
                console.error('Invalid direction');
        }

        div.style.setProperty("--slideInEndX", `${endPos[0]}px`);
        div.style.setProperty("--slideInEndY", `${endPos[1]}px`);

        parentDiv.appendChild(div);

        return div;
    }
}

function randomPosition() {
    const randomLeft = Math.floor(Math.random() * 101); // generate random number between 0 and 100
    const randomTop = Math.floor(Math.random() * 101); // generate random number between 0 and 100
    return [`${randomLeft}%`, `${randomTop}%`];
}