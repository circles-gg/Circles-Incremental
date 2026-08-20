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

function getRockMultiplier() {
    if (rocks >= 2) {
        return 4
    }

    if (rocks >= 1) {
        return 2
    }

    return 1
}

function updateCircles() {
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

function earnCircles() {
    circles +=
        circlesPerClick ** evenEvenMoreCirclesExponent *
        evenMoreCirclesMulti *
        getRockMultiplier()

    updateCircles()
    updateCirclesShop()
    saveGame()
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
        circlesPerClick ** evenEvenMoreCirclesExponent *
        evenMoreCirclesMulti *
        earnCirclesAutomaticallyLevel *
        getRockMultiplier()

    circles += circlesPerSecond

    updateCircles()
}

function rockReset() {
    const rockResetRequirement = 1000000

    if (circles < rockResetRequirement) {
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

    updateCircles()
    updateCirclesShop()
    updateRockMilestones()

    saveGame()
}

function saveGame() {
    localStorage.setItem("circles", circles)
    localStorage.setItem("circlesPerClick", circlesPerClick)

    localStorage.setItem("moreCirclesCost", moreCirclesCost)

    localStorage.setItem(
        "evenMoreCirclesCost",
        evenMoreCirclesCost
    )

    localStorage.setItem(
        "evenMoreCirclesMulti",
        evenMoreCirclesMulti
    )

    localStorage.setItem(
        "evenEvenMoreCirclesCost",
        evenEvenMoreCirclesCost
    )

    localStorage.setItem(
        "evenEvenMoreCirclesExponent",
        evenEvenMoreCirclesExponent
    )

    localStorage.setItem(
        "earnCirclesAutomaticallyCost",
        earnCirclesAutomaticallyCost
    )

    localStorage.setItem(
        "earnCirclesAutomaticallyLevel",
        earnCirclesAutomaticallyLevel
    )

    localStorage.setItem("rocks", rocks)

    localStorage.setItem(
        "circlesShopUnlocked",
        circlesShopUnlocked
    )
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

    updateCircles()
    updateCirclesShop()
    updateRockMilestones()
}

loadGame()

setInterval(passiveIncome, 250)

setInterval(function() {
    saveGame()
}, 5000)