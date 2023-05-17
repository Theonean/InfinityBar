//flags for bubbleshooter
let bubbleshooterPlaying = false;
let bubbleshooterFlagDown = true;
let bubbleshooterAnimLoop = false;
let bubbleshooterFrames = 18;
let bubbleshooterAnimStart = 0;
let bubbleshooterFrame = 0;
let bubbleshooterAnimEnd = bubbleshooterFrames;

let frameIndex = 0,
    lastUpdateTime = 0,
    frameTimeInterval = 200; // duration in ms of one frame

function animate(time) {
    // Check if enough time has passed since the last update
    if (time - lastUpdateTime > frameTimeInterval) {

        if (bubbleshooterPlaying) {
            document.getElementById('bubbleshooter').style.backgroundPosition =
                `${-(bubbleshooterFrame * 32)}px 0px`;
            // Increment the frame index
            bubbleshooterFrame++;
            console.log("New bubble shooter flag frame!");

            // Reset the frame index if it is the last frame
            if (bubbleshooterFrame > bubbleshooterAnimEnd) { // assuming we have 10 frames
                bubbleshooterFrame = bubbleshooterAnimStart;

                //stop the animation if were not supposed to loop with current frame
                if (!bubbleshooterAnimLoop) {
                    bubbleshooterPlaying = false;
                }
                console.log("Animation stopped playing");
            }

        }

        // Increment the frame index
        frameIndex++;

        // Reset the frame index if it is the last frame
        if (frameIndex > 9) { // assuming we have 10 frames
            frameIndex = 0;
        }

        // Record the current time as the last update time
        lastUpdateTime = time;
    }

    // Call this function again on the next frame
    requestAnimationFrame(animate);
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