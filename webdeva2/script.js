const locations = [
    "Singapore",
    "Japan",
    "Germany",
    "Canada"
];
const locationPin = [
    [71, 98],
    [80.5, 78],
    [48, 69],
    [18, 60]
];
var currLocation = locations[0], nextLocation = locations[0];
const locationDiv = document.querySelector(".locations");

//instaniating all country pins
for (let l = 0; l < locationPin.length; l++) {
    let newPin = document.createElement("img");
    newPin.src = "images/location-icon.png";
    newPin.id = locations[l];
    newPin.classList.add("locationPin");
    newPin.style.left = locationPin[l][0] + 'vw';
    newPin.style.top = locationPin[l][1] + 'vh';
    newPin.addEventListener("click", () => {
        selectDestination(newPin.id);
    })

    locationDiv.appendChild(newPin);
}
//updateLocation();


function selectDestination(name) {
    if(traveling == null){
        nextLocation = name;
        console.log(nextLocation);
        updateLocation();
    }
}

var traveling;
function updateLocation() {
    if (currLocation == nextLocation) {
        let currPin = document.querySelector(".locations #" + currLocation);
        currPin.style.display = "none";
        let planePin = document.querySelector("#plane");
        planePin.style.width = '5%';
        planePin.style.left = currPin.style.left;
        planePin.style.top = currPin.style.top;
    }
    else {
        
    }
}


var navOpen = true;
let navIcon = document.querySelector(".openNav");
let dropDown = document.querySelector("nav");
var rotation;
let rotateAngle = 0;
navIcon.addEventListener("click", () => {
    if (dropDown.style.maxHeight) {
        dropDown.style.maxHeight = null;
    }
    else {
        dropDown.style.maxHeight = dropDown.scrollHeight + "px";
    }

    if (rotation == null) {
        rotation = setInterval(rotateAnim, 10);
    }
    navOpen = !navOpen;
});

function rotateAnim() {
    let angleIntv = 5;
    let dir = navOpen ? 1 : -1;
    rotateAngle += angleIntv * dir;

    navIcon.style.transform = 'rotate(' + rotateAngle + 'deg)';
    if (rotateAngle <= -90 || rotateAngle == 0 || rotateAngle >= 90) {
        clearInterval(rotation);
        rotation = null;
    }
}