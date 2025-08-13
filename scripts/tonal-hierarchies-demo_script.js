const probes = [
    "./../media/audio/probes/probe_00.mp3",
    "./../media/audio/probes/probe_01.mp3",
    "./../media/audio/probes/probe_02.mp3",
    "./../media/audio/probes/probe_03.mp3",
    "./../media/audio/probes/probe_04.mp3",
    "./../media/audio/probes/probe_05.mp3",
    "./../media/audio/probes/probe_06.mp3",
    "./../media/audio/probes/probe_07.mp3",
    "./../media/audio/probes/probe_08.mp3",
    "./../media/audio/probes/probe_09.mp3",
    "./../media/audio/probes/probe_10.mp3",
    "./../media/audio/probes/probe_11.mp3"
];

const newOrder = [0, 10, 5, 9, 2, 3, 11, 1, 8, 4, 7, 6];
// const newOrder = [0, 7, 4, 5, 9, 2, 11 ,10, 8, 3, 1, 6];
//const newOrder = [1, 8, 5, 6, 10, 3, 12, 11, 9, 4, 2, 7]; // order by absolute pitch
const originalOrder = Array.from({ length: 12 }, (_, i) => i);

let currentAudio = null;
let currentCircle = null;
let isReordered = false;

document.addEventListener('DOMContentLoaded', () => {
  const reorderCircles = () => {
        const orderArray = isReordered ? newOrder : originalOrder;
        circles.forEach((circle, index) => {
            circle.style.order = orderArray[index];
        });
        isReordered = !isReordered;
    }
    
    
    const container = document.querySelector('.circle-container');
    const circles = Array.from(document.querySelectorAll('.circle'));

    circles.forEach((circle, index) => {
        circle.style.order = index;
        
        const colour = interpolateColour('#3498db', '#2ecc71', index / (circles.length));
        circle.style.backgroundColor = colour;
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'q') {
            reorderCircles();
        }
    });
});

function playSound(index) {
    const audio = new Audio(probes[index]);
    const circle = document.querySelectorAll('.circle')[index];

    // if the same circle is clicked again, stop the audio and reset the colour
    if (currentAudio && currentAudio.src === audio.src) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentCircle.classList.remove('active');
        currentAudio = null;
        currentCircle = null;
        return;
    }

    // if a different circle is clicked, stop the previous audio and reset its colour
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentCircle.classList.remove('active');
    }

    // play the new sound and set the new active circle
    currentAudio = audio;
    currentCircle = circle;

    // change the color of the circle
    circle.classList.add('active');

    // play the audio
    audio.play();

    // reset the color after the sound ends
    audio.onended = () => {
        circle.classList.remove('active');
        currentAudio = null;
        currentCircle = null;
    };
}

// Function to interpolate between two colours
function interpolateColour(colour1, colour2, factor) {
  const result = colour1.slice(1).match(/.{1,2}/g).map((hex, i) => {
    const decimal = parseInt(hex, 16);
    const otherDecimal = parseInt(colour2.slice(1).match(/.{1,2}/g)[i], 16);
    const interpolatedDecimal = Math.round(decimal + factor * (otherDecimal - decimal));
    return interpolatedDecimal.toString(16).padStart(2, '0');
  }).join('');
  return `#${result}`;
}
