let circles = 0
let circlesPerClick = 1
let circlesPerSecond = 0
let moreCirclesCost = 5
let evenMoreCirclesCost = 100
let evenMoreCirclesMulti = 1
let evenEvenMoreCirclesCost = 10000
let evenEvenMoreCirclesExponent = 1
let earnCirclesAutomaticallyCost = 1337
let earnCirclesAutomaticallyLevel = 0

let circlesShopUnlocked = false

function updateCircles() {
    document.getElementById("circles").textContent = circles

    document.getElementById("moreCirclesCost").textContent = moreCirclesCost

    document.getElementById("evenMoreCirclesCost").textContent = evenMoreCirclesCost

    document.getElementById("evenEvenMoreCirclesCost").textContent = evenEvenMoreCirclesCost

    document.getElementById("earnCirclesAutomaticallyCost").textContent =
        earnCirclesAutomaticallyCost
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

function earnCirclesAutomatically() {
    if (circles >= earnCirclesAutomaticallyCost) {
        circles -= earnCirclesAutomaticallyCost
        earnCirclesAutomaticallyLevel += 1
        earnCirclesAutomaticallyCost *= 10
        updateCircles()
        saveGame()
    }
}

function passiveIncome() {
    circlesPerSecond =
        circlesPerClick ** evenEvenMoreCirclesExponent * evenMoreCirclesMulti * earnCirclesAutomaticallyLevel

    circles += circlesPerSecond

    updateCircles()
}

function saveGame() {
    localStorage.setItem("circles", circles)
    localStorage.setItem("circlesPerClick", circlesPerClick)

    localStorage.setItem("moreCirclesCost", moreCirclesCost)
    localStorage.setItem("evenMoreCirclesCost", evenMoreCirclesCost)
    localStorage.setItem("evenMoreCirclesMulti", evenMoreCirclesMulti)

    localStorage.setItem("evenEvenMoreCirclesCost", evenEvenMoreCirclesCost)
    localStorage.setItem("evenEvenMoreCirclesExponent", evenEvenMoreCirclesExponent)

    localStorage.setItem(
        "earnCirclesAutomaticallyCost",
        earnCirclesAutomaticallyCost
    )

    localStorage.setItem(
        "earnCirclesAutomaticallyLevel",
        earnCirclesAutomaticallyLevel
    )

    localStorage.setItem("circlesShopUnlocked", circlesShopUnlocked)
}

function loadGame() {
    circles = Number(localStorage.getItem("circles")) || 0
    circlesPerClick = Number(localStorage.getItem("circlesPerClick")) || 1

    moreCirclesCost =
        Number(localStorage.getItem("moreCirclesCost")) || 5

    evenMoreCirclesCost =
        Number(localStorage.getItem("evenMoreCirclesCost")) || 100

    evenMoreCirclesMulti =
        Number(localStorage.getItem("evenMoreCirclesMulti")) || 1

    evenEvenMoreCirclesCost =
        Number(localStorage.getItem("evenEvenMoreCirclesCost")) || 10000

    evenEvenMoreCirclesExponent =
        Number(localStorage.getItem("evenEvenMoreCirclesExponent")) || 1

    earnCirclesAutomaticallyCost =
        Number(localStorage.getItem("earnCirclesAutomaticallyCost")) || 1337

    earnCirclesAutomaticallyLevel =
        Number(localStorage.getItem("earnCirclesAutomaticallyLevel")) || 0

    circlesShopUnlocked =
        localStorage.getItem("circlesShopUnlocked") === "true"

    updateCircles()
    updateCirclesShop()
}

setInterval(passiveIncome, 250)
setInterval(function() {
    saveGame()
}, 5000)
loadGame()