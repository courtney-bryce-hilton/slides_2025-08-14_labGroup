const examples = [
    "./media/audio/congruent.mp3",
    "./media/audio/incongruent.mp3"
];

let currentToneProbeAudio = null;
let currentToneProbeButton = null;

function playExample(index) {
    const audio = new Audio(examples[index - 1]);
    const button = document.querySelectorAll('button')[index - 1];

    // if the same example is clicked again, stop the audio and remove the active class
    if (currentToneProbeAudio && currentToneProbeAudio.src === audio.src) {
        currentToneProbeAudio.pause();
        currentToneProbeAudio.currentTime = 0;
        button.classList.remove('active');
        currentToneProbeAudio = null;
        currentToneProbeButton = null;
        return;
    }

    // stop the previous audio and remove the active class if a different example is clicked
    if (currentToneProbeAudio) {
        currentToneProbeAudio.pause();
        currentToneProbeAudio.currentTime = 0;
        currentToneProbeButton.classList.remove('active');
    }

    // play the new audio and add the active class to the button
    currentToneProbeAudio = audio;
    currentToneProbeButton = button;

    button.classList.add('active');
    audio.play();

    audio.onended = () => {
        button.classList.remove('active');
        currentToneProbeAudio = null;
        currentToneProbeButton = null;
    };
}
