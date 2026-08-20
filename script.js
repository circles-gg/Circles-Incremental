// ====================
// Game State
// ====================

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

let rocks = 0

let circlesShopUnlocked = false


// ====================
// Constants
// ====================

const ROCK_RESET_REQUIREMENT = 1000000

const MILESTONE_MULTIPLIERS = [
    1,
    2,
    4
]


// ====================
// Production
// ====================

function getRockMultiplier() {
    let multiplier = 1

    for (let i = 1; i <= rocks; i++) {
        multiplier *= MILESTONE_MULTIPLIERS[i] || 1
    }

    return multiplier
}

function getClickProduction() {
    return (
        circlesPerClick ** evenEvenMoreCirclesExponent *
        evenMoreCirclesMulti *
        getRockMultiplier()
    )
}

function getCirclesPerSecond() {
    return (
        getClickProduction() *
        earnCirclesAutomaticallyLevel
    )
}


// ====================
// UI
// ====================

function updateUI() {
    document.getElementById("circles").textContent = circles

    document.getElementById("moreCirclesCost").textContent =
        moreCirclesCost

    document.getElementById("evenMoreCirclesCost").textContent =
        evenMoreCirclesCost

    document.getElementById("evenEvenMoreCirclesCost").textContent =
        evenEvenMoreCirclesCost

    document.getElementById("earnCirclesAutomaticallyCost").textContent =
        earnCirclesAutomaticallyCost

    document.getElementById("rocks").textContent = rocks

    updateCirclesShop()
    updateRockMilestones()
}

function updateCirclesShop() {
    if (circles >= 5) {
        circlesShopUnlocked = true
    }

    document.getElementById("circlesShop").style.display =
        circlesShopUnlocked ? "block" : "none"
}

function updateRockMilestones() {
    document.getElementById("rockMilestones").style.display =
        rocks >= 1 ? "block" : "none"
}


// ====================
// Layer 0
// ====================

function earnCircles() {
    circles += getClickProduction()

    updateUI()
    saveGame()
}

function moreCircles() {
    if (circles < moreCirclesCost) {
        return
    }

    circles -= moreCirclesCost
    circlesPerClick += 1
    moreCirclesCost *= 2

    updateUI()
    saveGame()
}

function evenMoreCircles() {
    if (circles < evenMoreCirclesCost) {
        return
    }

    circles -= evenMoreCirclesCost
    evenMoreCirclesMulti += 1
    evenMoreCirclesCost *= 2

    updateUI()
    saveGame()
}

function evenEvenMoreCircles() {
    if (circles < evenEvenMoreCirclesCost) {
        return
    }

    circles -= evenEvenMoreCirclesCost
    evenEvenMoreCirclesExponent += 1
    evenEvenMoreCirclesCost **= 2

    updateUI()
    saveGame()
}

function earnCirclesAutomatically() {
    if (circles < earnCirclesAutomaticallyCost) {
        return
    }

    circles -= earnCirclesAutomaticallyCost
    earnCirclesAutomaticallyLevel += 1
    earnCirclesAutomaticallyCost *= 10

    updateUI()
    saveGame()
}


// ====================
// Layer 1
// ====================

function rockReset() {
    if (circles < ROCK_RESET_REQUIREMENT) {
        return
    }

    rocks += 1

    circles = 0
    circlesPerClick = 1

    moreCirclesCost = 5

    evenMoreCirclesCost = 100
    evenMoreCirclesMulti = 1

    evenEvenMoreCirclesCost = 10000
    evenEvenMoreCirclesExponent = 1

    circlesShopUnlocked = false

    updateUI()
    saveGame()
}


// ====================
// Passive Income
// ====================

function passiveIncome() {
    circlesPerSecond = getCirclesPerSecond()

    circles += circlesPerSecond / 4

    updateUI()
}


// ====================
// Save / Load
// ====================

const SAVE_KEYS = [
    "circles",
    "circlesPerClick",
    "moreCirclesCost",
    "evenMoreCirclesCost",
    "evenMoreCirclesMulti",
    "evenEvenMoreCirclesCost",
    "evenEvenMoreCirclesExponent",
    "earnCirclesAutomaticallyCost",
    "earnCirclesAutomaticallyLevel",
    "rocks",
    "circlesShopUnlocked"
]

function saveGame() {
    SAVE_KEYS.forEach(key => {
        localStorage.setItem(key, window[key])
    })
}

function loadGame() {
    circles =
        Number(localStorage.getItem("circles")) || 0

    circlesPerClick =
        Number(localStorage.getItem("circlesPerClick")) || 1

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

    rocks =
        Number(localStorage.getItem("rocks")) || 0

    circlesShopUnlocked =
        localStorage.getItem("circlesShopUnlocked") === "true"

    updateUI()
}


// ====================
// Game Start
// ====================

loadGame()

setInterval(passiveIncome, 250)

setInterval(saveGame, 5000)