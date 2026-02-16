let trumpetSprite = "tpt";
const click1 = new Audio('audio/click1.mp3');
const click2 = new Audio('audio/click2.mp3');
const hover = new Audio ('audio/hover.wav');
const arp = new Audio ('audio/arpeggio.mp3');
const valve1 = document.getElementById('valve1')
const valve2 = document.getElementById('valve2')
const valve3 = document.getElementById('valve3')
const keyText = document.getElementById('keytext');
const keyStuff = document.getElementById('keystuff');
let twelvetet = false;
let controlRaised = false;
let root = Math.pow(2, (0/12));
let playingKey = "Bb";
let valveKeys = ["p", "o", "i"];
const partialKeys = ['shift', "z", "x", "c", "v", "b", "n", "m", ",", "."];
const tuningSwitch = document.getElementById("tuningswitch");
const keyDropdown = document.getElementById("key");
const controlSwitch = document.getElementById("controlswitch");
let activeKey = null;
let previousKey = null;
const fingers = new Set();
let currentBb = null;
let position = 1
const trumpetImage = document.getElementById('trumpet');

controlSwitch.addEventListener('mouseenter', () => {
    hover.cloneNode(true).play();
})
keyStuff.addEventListener('mouseenter', () => {
    hover.cloneNode(true).play();
})
tuningSwitch.addEventListener('mouseenter', () => {
    hover.cloneNode(true).play();
})
controlSwitch.addEventListener('mouseleave', () => {
    hover.cloneNode(true).play();
})
keyStuff.addEventListener('mouseleave', () => {
    hover.cloneNode(true).play();
})
tuningSwitch.addEventListener('mouseleave', () => {
    hover.cloneNode(true).play();
})
controlSwitch.addEventListener('mousedown', () => {
    click1.cloneNode(true).play();
})
controlSwitch.addEventListener('mouseup', () => {
    click2.cloneNode(true).play();
})
tuningSwitch.addEventListener('mousedown', () => {
    click1.cloneNode(true).play();
})
tuningSwitch.addEventListener('mouseup', () => {
    click2.cloneNode(true).play();
    twelvetet = !twelvetet;
})
keyDropdown.addEventListener('change', () => {
    document.activeElement.blur();
    arp.cloneNode(true).play();
    playingKey = keyDropdown.value;
    if(keyDropdown.value == "Bb") {
        root = Math.pow(2, (0/12));
    }
    if(keyDropdown.value == "B") {
        root = Math.pow(2, (1/12));
    }
    if(keyDropdown.value == "C") {
        root = Math.pow(2, (2/12));
    }
    if(keyDropdown.value == "Db") {
        root = Math.pow(2, (3/12));
    }
    if(keyDropdown.value == "D") {
        root = Math.pow(2, (4/12));
    }
    if(keyDropdown.value == "Eb") {
        root = Math.pow(2, (5/12));
    }
    if(keyDropdown.value == "E") {
        root = Math.pow(2, (6/12));
    }
    if(keyDropdown.value == "F") {
        root = Math.pow(2, (7/12));
    }
    if(keyDropdown.value == "Gb") {
        root = Math.pow(2, (-4/12));
    }
    if(keyDropdown.value == "G") {
        root = Math.pow(2, (-3/12));
    }
    if(keyDropdown.value == "Ab") {
        root = Math.pow(2, (-2/12));
    }
    if(keyDropdown.value == "A") {
        root = Math.pow(2, (-1/12));
    }
    console.log(playingKey);
})
controlSwitch.addEventListener('click', () => {
    controlRaised = !controlRaised;
    if(controlRaised == false) {
        valve1.textContent = "i";
        valve3.textContent = "p";
    } else {
        valve1.textContent = "p";
        valve3.textContent = "i";
    }
})

function getPlaybackRate(key, position) {
    if(twelvetet == true) {
        baseFactors = {
        shift: Math.pow(2, (0/12)) * root,
        z: Math.pow(2, (0/12)) * 2 * root,
        x: Math.pow(2, (7/12)) * 2 * root,
        c: Math.pow(2, (12/12)) * 2 * root,
        v: Math.pow(2, (16/12)) * 2 * root,
        b: Math.pow(2, (19/12)) * 2 * root,
        n: Math.pow(2, (22/12)) * 2 * root,
        m: Math.pow(2, (24/12)) * 2 * root,
        ",": Math.pow(2, (26/12)) * 2 * root,
        ".": Math.pow(2, (28/12)) * 2 * root
    }
    }
    else {
        baseFactors = {
        shift: 1 * root,
        z: 1 * 2 * root,
        x: 1.5 * 2 * root,
        c: 2 * 2 * root,
        v: 2.5 * 2 * root,
        b: 3 * 2 * root,
        n: 3.5 * 2 * root,
        m: 4 * 2 * root,
        ",": 4.5 * 2 * root,
        ".": 5 * 2 * root
    }
    }
    const factor = Math.pow(Math.pow(2, (-0.5)), (position - 1) / 6);
    return baseFactors[key] * factor;
}
function playBb(rate) {
   if (currentBb) {
    currentBb.pause();
    currentBb.currentTime = 0;
   } 
   currentBb = new Audio('audio/bbtrumpet.mp3')
   currentBb.preservesPitch = false;
   currentBb.playbackRate = rate;
   currentBb.play();
}
function checkFingers() {
    const fingering = [...fingers].sort().join("");
    if(controlRaised == true) {
        switch (fingering) {
        case "p":
            trumpetImage.src = "images/tpt1.png";
            position = 3;
            break;
        case "o":
            trumpetImage.src = "images/tpt2.png";
            position = 2;
            break;
        case "i":
            trumpetImage.src = "images/tpt3.png";
            position = 4;
            break;
        case "op":
            trumpetImage.src = "images/tpt12.png";
            position = 4;
            break;
        case "ip":
            trumpetImage.src = "images/tpt13.png";
            position = 6;
            break;
        case "io":
            trumpetImage.src = "images/tpt23.png"
            position = 5;
            break;
        case "iop":
            trumpetImage.src = "images/tpt123.png"
            position = 7;
            break;
        default:
            trumpetImage.src = "images/tpt.png"
            position = 1;
        getPlaybackRate();
    }
    }
    else {
        switch (fingering) {
        case "i":
            trumpetImage.src = "images/tpt1.png";
            position = 3;
            break;
        case "o":
            trumpetImage.src = "images/tpt2.png";
            position = 2;
            break;
        case "p":
            trumpetImage.src = "images/tpt3.png";
            position = 4;
            break;
        case "io":
            trumpetImage.src = "images/tpt12.png";
            position = 4;
            break;
        case "ip":
            trumpetImage.src = "images/tpt13.png";
            position = 6;
            break;
        case "op":
            trumpetImage.src = "images/tpt23.png"
            position = 5;
            break;
        case "iop":
            trumpetImage.src = "images/tpt123.png"
            position = 7;
            break;
        default:
            trumpetImage.src = "images/tpt.png"
            position = 1;
        getPlaybackRate();
    }
    }
}

document.addEventListener('keydown', (check) => {
    if(check.repeat) return;
    const key = check.key.toLowerCase();
    if(!valveKeys.includes(key) && !partialKeys.includes(key)) return;
    if(valveKeys.includes(key)) {
        fingers.add(key);
    }
    checkFingers();
    if(partialKeys.includes(key)) {
        activeKey = key;
        playBb(getPlaybackRate(activeKey, position));
    }
    if(activeKey !== null && activeKey !== key && partialKeys.includes(activeKey)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
    }
    if(valveKeys.includes(key) && partialKeys.includes(activeKey)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
        playBb(getPlaybackRate(activeKey, position));
    }
})
document.addEventListener('keyup', (check) => {
        const key = check.key.toLowerCase();
    if(partialKeys.includes(key)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
            activeKey = null;
        }
    }
        if(valveKeys.includes(key) && partialKeys.includes(activeKey)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
        fingers.delete(check.key.toLowerCase());
        checkFingers();
        getPlaybackRate();
        playBb(getPlaybackRate(activeKey, position));
    }

    if(valveKeys.includes(key) && !partialKeys.includes(key) && !activeKey == null) {
        checkFingers();
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
    }
    fingers.delete(check.key.toLowerCase());
    checkFingers();


}) 