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
            "color": "magenta",//"transparent",
            "clickReaction": function () {
                if (!bubbleshooterPlaying) {
                    //if clicked and flag down, play flag up
                    if (bubbleshooterFlagDown) {
                        bubbleshooterAnimStart = 0;
                        bubbleshooterAnimEnd = 6;
                        bubbleSpeed = 10;
                        coneAngle = 360; // in degrees
                        bubbleDelay = 20;
                    }
                    else {
                        bubbleshooterAnimStart = 8;
                        bubbleshooterAnimEnd = 13;
                        bubbleSpeed = 1;
                        coneAngle = 45; // in degrees
                        bubbleDelay = 200;
                    }
                    startBubbleInterval();
                    bubbleshooterFrame = bubbleshooterAnimStart
                    bubbleshooterFlagDown = !bubbleshooterFlagDown;
                    bubbleshooterAnimLoop = false;
                    bubbleshooterPlaying = true;
                    console.log("Playing anim?");
                }
            }
        },
        {
            //on / off button
            "pos": { "x": 14, "y": 20 },
            "size": { "x": 10, "y": 9 },
            "color": "red",
            "clickReaction": function () {
                //

                if (bubbleIntervalId) {
                    stopBubbleInterval();

                    bubbleshooterAnimStart = 0;
                    bubbleshooterAnimEnd = 13;
                    bubbleshooterAnimLoop = true;
                    bubbleshooterPlaying = true;
                    bubbleshooterFrame = bubbleshooterAnimStart
                    bubbleshooterFlagDown = true;
                }
                else{
                    //plays first frame so its "reset"
                    bubbleshooterAnimLoop = false;
                    bubbleshooterPlaying = true;
                    bubbleshooterAnimStart = 0;
                    bubbleshooterAnimEnd = 1;
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
    }
];