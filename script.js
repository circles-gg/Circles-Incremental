let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0

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
}

function loadGame() {
    circles = Number(localStorage.getItem("circles")) || 0
    updateCircles()
}

loadGame()