/*
DirectionGod int to direction table
 * 0: top, 1: bottom, 2: left, 3: right

*/


// JSON data structure
var bardata = [
    {
        "parent": "wrapper",
        //"startDir": "left", starting direction is determined by usersetting Chaos/Satisfying
        "prefferedStartDir": 0,
        "endPos": [0, 0],
        "id": "wall"
        //"className": "my-class",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 1,
        "endPos": [0, 0],
        "id": "floor"
        //"className": "my-class",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [60, 200],
        "id": "counter"
        //"className": "my-class",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [200, 270],
        "id": "barstool1",
        "className": "barstool",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [140, 100],
        "id": "person0",
        "className": "person",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [70, 180],
        "id": "bubbleshooter",
        "clickbox": [{
            //fidget flag
            "pos": { "x": -4, "y": 18 },
            "size": { "x": 5, "y": 12 },
            "color": "transparent",
            "clickReaction": function () {
                let idName = "bubbleshooter"
                let bubbleShooterDiv = document.getElementById(idName);
                let bubbleData;
                //initialize needed variables to animate this div
                if (!divsToAnimate.has(idName)) {
                    console.log("Writing first time data");
                    bubbleData = {
                        "div": bubbleShooterDiv,
                        "Frames": 18,
                        "Frame": 0,
                        "AnimStart": 0,
                        "AnimEnd": 6,
                        "Playing": false,
                        "AnimLoop": false,
                        "FlagDown": false,
                        "frameWidth": 32
                    }

                    bubbleSpeed = 1;
                    coneAngle = 45; // in degrees
                    bubbleDelay = 200;
                    divsToAnimate.set(idName, bubbleData);
                    //only react to clicks when no animations are playing
                }

                //console.log(idName);
                bubbleData = divsToAnimate.get(idName);

                if (!bubbleData.Playing) {
                    //raise flag up and set chaos bubble mode on
                    if (bubbleData.FlagDown) {
                        bubbleData.AnimStart = 0;
                        bubbleData.AnimEnd = 6;
                        bubbleSpeed = 10;
                        coneAngle = 360; // in degrees
                        bubbleDelay = 20;
                        //descend flag to normal again
                    } else {
                        bubbleData.AnimStart = 8;
                        bubbleData.AnimEnd = 13;
                        bubbleSpeed = 1;
                        coneAngle = 45; // in degrees
                        bubbleDelay = 200;
                    }
                    startBubbleInterval();
                    bubbleData.Frame = bubbleData.AnimStart;
                    bubbleData.FlagDown = !bubbleData.FlagDown;
                    bubbleData.Playing = true;
                    console.log("Playing anim?");
                }
            }
        },
        {
            //on / off button
            "pos": { "x": 14, "y": 20 },
            "size": { "x": 10, "y": 9 },
            "color": "transparent",
            "clickReaction": function () {
                let idName = "bubbleshooter"
                let bubbleShooterDiv = document.getElementById(idName);
                let bubbleData;
                //initialize needed variables to animate this div
                if (!divsToAnimate.has(idName)) {
                    console.log("Writing first time data");
                    bubbleData = {
                        "div": bubbleShooterDiv,
                        "Frames": 18,
                        "Frame": 0,
                        "AnimStart": 0,
                        "AnimEnd": 6,
                        "Playing": false,
                        "AnimLoop": false,
                        "FlagDown": false,
                        "frameWidth": 32
                    }

                    bubbleSpeed = 1;
                    coneAngle = 45; // in degrees
                    bubbleDelay = 200;
                    divsToAnimate.set(idName, bubbleData);
                    //only react to clicks when no animations are playing
                }

                //console.log(idName);
                bubbleData = divsToAnimate.get(idName);

                if (bubbleIntervalId) {
                    stopBubbleInterval();

                    bubbleData.AnimStart = 0;
                    bubbleData.AnimLoop = true;
                    bubbleData.Playing = true;
                    bubbleData.Frame = bubbleData.AnimStart;
                    bubbleData.FlagDown = true;
                }
                else {
                    //plays first frame so its "reset"
                    bubbleData.AnimLoop = false;
                    bubbleData.Playing = true;
                    bubbleSpeed = 1;
                    coneAngle = 45; // in degrees
                    bubbleDelay = 200;

                    startBubbleInterval();
                }

                console.log("Bubbeshooter on off button anim");


            }
        }]
        //"className": "my-class",
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [150, 106],
        "id": "bottle1",
        "className": "bottle"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [182, 106],
        "id": "bottle2",
        "className": "bottle"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [210, 106],
        "id": "bottle3",
        "className": "bottle"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [150, 78],
        "id": "can1",
        "className": "can",
        "clickbox": createCanClickbox(1)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [180, 78],
        "id": "can2",
        "className": "can",
        "clickbox": createCanClickbox(2)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [210, 78],
        "id": "can3",
        "className": "can",
        "clickbox": createCanClickbox(3)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [240, 78],
        "id": "can4",
        "className": "can",
        "clickbox": createCanClickbox(4)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [270, 78],
        "id": "can5",
        "className": "can",
        "clickbox": createCanClickbox(5)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [120, 78],
        "id": "can6",
        "className": "can",
        "clickbox": createCanClickbox(6)
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [30, 280],
        "id": "spaceship",
        "clickbox": [{
            "pos": { "x": 0, "y": 0 },
            "size": { "x": 30, "y": 40 },
            "color": "transparent",
            "clickReaction": function () {
                let idName = "spaceship"
                let div = document.getElementById(idName);
                let spaceData;
                //initialize needed variables to animate this div on first click
                if (!divsToAnimate.has(idName)) {
                    console.log("Writing first time data");
                    spaceData = {
                        "div": div,
                        "Frames": 37,
                        "Frame": 0,
                        "AnimStart": 0,
                        "AnimEnd": 37,
                        "AnimLoop": false,
                        "frameWidth": 400
                    }
                    divsToAnimate.set(idName, spaceData);
                }

                //console.log(idName);
                spaceData = divsToAnimate.get(idName);

                if (!spaceData.Playing) {
                    spaceData.Playing = true;
                }
            }
        }]
    }
];


//FUNCTIONS TO GENERATE CLICKBOXES

//Returns the clickbox object required for creation of a clickbox plus logic for clickin
function createArcadeClickbox(number) {
    return [{
        "pos": { "x": 0, "y": 0 },
        "size": { "x": 200, "y": 200 },
        "color": "transparent",
        "clickReaction": function () {
            let idName = "arcade" + number;
            console.log(idName);
            let div = document.getElementById(idName);
            let data;

            //initialize needed variables to animate this div on first click
            if (!divsToAnimate.has(idName)) {
                console.log("Writing first time data");
                data = {
                    "div": div,
                    "Frames": 26,
                    "Frame": 0,
                    "AnimStart": 17,
                    "AnimEnd": 26,
                    "AnimLoop": true,
                    "frameWidth": 246
                }
                divsToAnimate.set(idName, data);
            }

            //console.log(idName);
            data = divsToAnimate.get(idName);
            console.log("Arcade clicked");
            //only interactable when not playing right now --> may use external interrupts like button on bubbleshooter
            if (!data.Playing) {
                data.Playing = true;

                //implement logic for clicking here
            }
        }
    }];
}

//Returns the clickbox object required forcans
function createCanClickbox(number) {
    return [{
        "pos": { "x": 10, "y": 8 },
        "size": { "x": 13, "y": 22 },
        "color": "transparent",
        "clickReaction": function () {
            let idName = "can" + number;
            console.log(idName);
            let div = document.getElementById(idName);
            let data;

            //initialize needed variables to animate this div on first click
            if (!divsToAnimate.has(idName)) {
                console.log("Writing first time data");
                data = {
                    "div": div,
                    "Frames": 50,
                    "Frame": 0,
                    "AnimStart": 0,
                    "AnimEnd": 1,
                    "AnimLoop": false,
                    "frameWidth": 32,
                    "numClicked": 0
                }
                divsToAnimate.set(idName, data);
            }

            //console.log(idName);
            data = divsToAnimate.get(idName);
            console.log("data");
            console.log(data);
            console.log("Arcade clicked");
            //only interactable when not playing right now --> may use external interrupts like button on bubbleshooter
            if (!data.Playing) {
                data.Playing = true;

                //first three clicks create indents oncan
                switch (data.numClicked) {
                    case 0:
                        data.AnimStart = 1;
                        data.AnimEnd = 2;
                        data.AnimLoop = false;
                        break;
                    case 1:
                        data.AnimStart = 2;
                        data.AnimEnd = 3;
                        data.AnimLoop = false;
                        break;
                    case 2:
                        data.Frame = 3;
                        data.AnimStart = 26;
                        data.AnimEnd = 31;
                        data.AnimLoop = true;
                        break;
                }

                data.numClicked += 1;
            }
            //wavingcan be interrupted by another click oncan
            else {
                if (data.numClicked === 3) {
                    data.AnimEnd = 50;
                    data.AnimLoop = false;
                    data.numClicked = 0;

                }
            }

            console.log("canclicks: " + data.numClicked);
        }
    }];
}