let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0

function updateCircles() {
document.getElementById("circles").textContent = circles;
}

function earnCircles() {
circles += circlesPerClick
updateCircles()
}

updateCircles()