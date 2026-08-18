let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0
let moreCirclesCost = 50

function updateCircles() {
    document.getElementById("circles").textContent = circles
}

function earnCircles() {
    circles += circlesPerClick
    updateCircles()
    saveGame()
}

function saveGame() {
localStorage.setItem("circles", circles)
localStorage.setItem("circlesPerClick", circlesPerClick)
}

function loadGame() {
circles = Number(localStorage.getItem("circles")) || 0
Number(localStorage.getItem("circlesPerClick")) || 1
updateCircles()
}

loadGame()