let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0
let moreCirclesCost = 5
let circlesShopUnlocked = false

function updateCircles() {
    document.getElementById("circles").textContent = circles
    document.getElementById("moreCirclesCost").textContent = moreCirclesCost
}

function earnCircles() {
    circles += circlesPerClick
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

function saveGame() {
    localStorage.setItem("circles", circles)
    localStorage.setItem("circlesPerClick", circlesPerClick)
    localStorage.setItem("moreCirclesCost", moreCirclesCost)
    localStorage.setItem("circlesShopUnlocked", circlesShopUnlocked)
}

function loadGame() {
    circles = Number(localStorage.getItem("circles")) || 0
    circlesPerClick = Number(localStorage.getItem("circlesPerClick")) || 1
    moreCirclesCost = Number(localStorage.getItem("moreCirclesCost")) || 5
    circlesShopUnlocked =
        localStorage.getItem("circlesShopUnlocked") === "true"

    updateCircles()
    updateCirclesShop()
}

loadGame()