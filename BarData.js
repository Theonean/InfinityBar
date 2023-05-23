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
        "id": "person1",
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
        "id": " can1",
        "className": "can"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [180, 78],
        "id": " can2",
        "className": "can"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [210, 78],
        "id": " can3",
        "className": "can"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [240, 78],
        "id": " can4",
        "className": "can"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [270, 78],
        "id": " can5",
        "className": "can"
    },
    {
        "parent": "wrapper",
        "prefferedStartDir": 2,
        "endPos": [120, 78],
        "id": " can6",
        "className": "can"
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