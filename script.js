let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0
let moreCirclesCost = 5
let evenMoreCirclesCost = 100
let evenMoreCirclesMulti = 1
let evenEvenMoreCirclesCost = 10000
let evenEvenMoreCirclesExponent = 1

let circlesShopUnlocked = false

function updateCircles() {
document.getElementById("circles").textContent = circles

document.getElementById("moreCirclesCost").textContent = moreCirclesCost

document.getElementById("evenMoreCirclesCost").textContent = evenMoreCirclesCost

document.getElementById("evenEvenMoreCirclesCost").textContent = evenEvenMoreCirclesCost
}

function earnCircles() {
    circles += circlesPerClick ** evenEvenMoreCirclesExponent * evenMoreCirclesMulti
    updateCircles()
    updateCirclesShop()
    saveGame()
}

function updateCirclesShop() {
    if (circles >= 5) {
        circlesShopUnlocked = true
    }

    document.getElementById("circlesShop").style.display =
        circlesShopUnlocked ? "block" : "none"
}

function moreCircles() {
    if (circles >= moreCirclesCost) {
        circles -= moreCirclesCost
        circlesPerClick += 1
        moreCirclesCost *= 2
        updateCircles()
        saveGame()
    }
}

function evenMoreCircles() {
    if (circles >= evenMoreCirclesCost) {
        circles -= evenMoreCirclesCost
        evenMoreCirclesMulti += 1
        evenMoreCirclesCost *= 2
        updateCircles()
        saveGame()
    }
}

function evenEvenMoreCircles() {
    if (circles >= evenEvenMoreCirclesCost) {
        circles -= evenEvenMoreCirclesCost
        evenEvenMoreCirclesExponent += 1
        evenEvenMoreCirclesCost **= 2
        updateCircles()
        saveGame()
    }
}

function saveGame() {
localStorage.setItem("circles", circles)
    localStorage.setItem("circlesPerClick", circlesPerClick)

localStorage.setItem("moreCirclesCost", moreCirclesCost)
    localStorage.setItem("evenMoreCirclesCost", evenMoreCirclesCost)

localStorage.setItem("evenMoreCirclesMulti", evenMoreCirclesMulti)

localStorage.setItem("evenEvenMoreCirclesCost", evenEvenMoreCirclesCost)

localStorage.setItem("evenEvenMoreCirclesExponent", evenEvenMoreCirclesExponent)
 localStorage.setItem("circlesShopUnlocked", circlesShopUnlocked)
}

function loadGame() {
circles = Number(localStorage.getItem("circles")) || 0
circlesPerClick = Number(localStorage.getItem("circlesPerClick")) || 1
moreCirclesCost = Number(localStorage.getItem("moreCirclesCost")) || 5
evenMoreCirclesCost = Number(localStorage.getItem("evenMoreCirclesCost")) || 100
evenMoreCirclesMulti = Number(localStorage.getItem("evenMoreCirclesMulti")) || 1
Number(localStorage.getItem("evenEvenMoreCirclesCost")) || 10000
Number(localStorage.getItem("evenEvenMoreCirclesExponent")) || 1
circlesShopUnlocked = localStorage.getItem("circlesShopUnlocked") === "true"

    updateCircles()
    updateCirclesShop()
}

loadGame()