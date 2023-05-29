//flags for bubbleshooter
let bubbleshooterPlaying = false;
let bubbleshooterFlagDown = true;
let bubbleshooterAnimLoop = false;
let bubbleshooterFrames = 18;
let bubbleshooterAnimStart = 0;
let bubbleshooterFrame = 0;
let bubbleshooterAnimEnd = bubbleshooterFrames;

let divsToAnimate = new Map();

let frameIndex = 0,
    lastUpdateTime = 0,
    frameTimeInterval = 200; // duration in ms of one frame

function animate(time) {
    // Check if enough time has passed since the last update
    if (time - lastUpdateTime > frameTimeInterval) {

        for (let [key, value] of divsToAnimate) {
            //console.log(key, value);
            playFrameForDiv(value);
        }

        // Increment the frame index
        frameIndex++;


        // Record the current time as the last update time
        lastUpdateTime = time;
    }

    // Call this function again on the next frame
    requestAnimationFrame(animate);
}

function playFrameForDiv(divDataObject) {
    let data = divDataObject;
    if (data.Playing) {
        let divFrame = data.Frame;
        let frameWidth = data.frameWidth;
        //console.log(divFrame + " " + data);
        //console.log(data);

        let frameY = 0;
        if (data.div.style.getPropertyValue("--tileNumber") !== null) {
            frameY = data.div.style.getPropertyValue("--tileNumber");
            console.log(frameY + " frameY"); 
        }
        data.div.style.backgroundPosition = `${-(divFrame * frameWidth)}px ${frameY * 32}px`;

        // Increment the frame index
        divFrame += 1;
        data.Frame = divFrame;
        //console.log("New frame! " + divFrame);


        // Reset the frame index if it is the last frame
        if (divFrame >= data.AnimEnd) {
            data.Frame = data.AnimStart;

            // Stop the animation if we're not supposed to loop with current frame
            if (!data.AnimLoop) {
                data.Playing = false;
            }
            console.log("Animation stopped playing");
        }
    }

}


function playSoundFile(file) {
    // Create AudioContext
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var buffer;
    // Create Audio source
    // Note: this assumes you have a path to an audio file
    fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            var source = audioContext.createBufferSource();
            buffer = audioBuffer;
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(); // play the sound now
        })
        .catch(e => console.error(e));

    source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Randomly alter the playback rate each time the sound is played
    source.playbackRate.value = Math.random() * 100 + 0.5;  // Change the range as per your needs

    // Connect the audio source to the audio context's destination (the speakers) and play
    source.connect(audioContext.destination);
    source.start();
}



