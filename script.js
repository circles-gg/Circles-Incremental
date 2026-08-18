let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0
let moreCirclesCost = 5

function updateCircles() {
 document.getElementById("circles").textContent = circles
document.getElementById("moreCirclesCost").textContent = moreCirclesCost
}

function earnCircles() {
    circles += circlesPerClick
    updateCircles()
    saveGame()
}

function moreCircles() {
    if (circles >= moreCirclesCost) {
        circles -= moreCirclesCost
        circlesPerClick += 1
        moreCirclesCost *= 2
        updateCircles()
    }
}

function saveGame() {
localStorage.setItem("circles", circles)
localStorage.setItem("circlesPerClick", circlesPerClick)
localStorage.setItem("moreCirclesCost", moreCirclesCost)
}

function loadGame() {
circles = Number(localStorage.getItem("circles")) || 0
Number(localStorage.getItem("circlesPerClick")) || 1
Number(localStorage.getItem("moreCirclesCost")) || 5
updateCircles()
}

loadGame()