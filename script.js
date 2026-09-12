// ====================
// Game State
// ====================

let circles = 0;

let circlesPerClick = 1;
let circlesPerSecond = 0;

let moreCirclesLevel = 0;

let evenMoreCirclesLevel = 0;
let evenMoreCirclesMulti = 1;

let evenEvenMoreCirclesLevel = 0;
let evenEvenMoreCirclesExponent = 1;

let earnCirclesAutomaticallyLevel = 0;

let rocks = 0;

let boosters = 0
let RT2048Multi = 1

let circlesShopUnlocked = false;

// ====================
// Constants
// ====================

const ROCK_RESET_REQUIREMENT = 1000000;

const ADD_MORE_BOOSTER_BASE_COST = 10
const ADD_MORE_BOOSTER_COST_MULTIPLIER = 3
const MAX_RT2048_MULTI = 2048;

const MORE_CIRCLES_BASE_COST = 5;
const MORE_CIRCLES_COST_MULTIPLIER = 2;

const EVEN_MORE_CIRCLES_BASE_COST = 100;
const EVEN_MORE_CIRCLES_COST_MULTIPLIER = 4;

const EVEN_EVEN_MORE_CIRCLES_BASE_COST = 10000;

const AUTOMATIC_CIRCLES_BASE_COST = 1337;

const AUTOMATIC_CIRCLES_COST_MULTIPLIER = 10;

const MILESTONE_REQUIREMENTS = [0, 1, 2, 5]
const MILESTONE_MULTIPLIERS = [1, 2, 4, 8]

// ====================
// Cost Calculations
// ====================

function getMoreCirclesCost() {
    return MORE_CIRCLES_BASE_COST * MORE_CIRCLES_COST_MULTIPLIER ** moreCirclesLevel;
}

function getEvenMoreCirclesCost() {
    return EVEN_MORE_CIRCLES_BASE_COST * EVEN_MORE_CIRCLES_COST_MULTIPLIER ** evenMoreCirclesLevel;
}

function getEvenEvenMoreCirclesCost() {
    return EVEN_EVEN_MORE_CIRCLES_BASE_COST ** 2 ** evenEvenMoreCirclesLevel;
}

function getEarnCirclesAutomaticallyCost() {
    return AUTOMATIC_CIRCLES_BASE_COST * AUTOMATIC_CIRCLES_COST_MULTIPLIER ** earnCirclesAutomaticallyLevel;
}

function getBoosterCost() {
    if (RT2048Multi >= MAX_RT2048_MULTI) {
        return Infinity;
    }

    return ADD_MORE_BOOSTER_BASE_COST * ADD_MORE_BOOSTER_COST_MULTIPLIER ** boosters;
}

// ====================
// Production
// ====================

function getRockMultiplier() {
    let multiplier = 1

    for (let i = 1; i < MILESTONE_REQUIREMENTS.length; i++) {
        if (rocks >= MILESTONE_REQUIREMENTS[i]) {
            multiplier *= MILESTONE_MULTIPLIERS[i]
        }
    }

    return multiplier
}

function getClickProduction() {
    return circlesPerClick ** evenEvenMoreCirclesExponent * evenMoreCirclesMulti * getRockMultiplier();
}

function getCirclesPerSecond() {
    return getClickProduction() * earnCirclesAutomaticallyLevel;
}

// ====================
// UI
// ====================

function updateUI() {
    document.getElementById("circles").textContent = circles;
    document.getElementById("moreCirclesCost").textContent = getMoreCirclesCost();
    document.getElementById("evenMoreCirclesCost").textContent = getEvenMoreCirclesCost();
    document.getElementById("evenEvenMoreCirclesCost").textContent = getEvenEvenMoreCirclesCost();
    document.getElementById("earnCirclesAutomaticallyCost").textContent = getEarnCirclesAutomaticallyCost();
    document.getElementById("rocks").textContent = rocks;

document.getElementById("RT2048Multi").textContent = RT2048Multi;

document.getElementById("addMoreBoosterCost").textContent = getBoosterCost();

document.getElementById("RoadTo2048").style.display = boosters >= 1 || rocks >= ADD_MORE_BOOSTER_BASE_COST ? "block" : "none";

    updateCirclesShop();
    updateRockMilestones();
}

function updateCirclesShop() {
    if (circles >= 5) {
        circlesShopUnlocked = true;
    }

    document.getElementById("circlesShop").style.display = circlesShopUnlocked ? "block" : "none";
}

function updateRockMilestones() {
document.getElementById("rockMilestones").style.display = circles >= ROCK_RESET_REQUIREMENT || rocks >= 1 ? "block" : "none";
}

// ====================
// Layer 0
// ====================

function earnCircles() {
    circles += getClickProduction();

    updateUI();
    saveGame();
}

function moreCircles() {
    const cost = getMoreCirclesCost();

    if (circles < cost) {
        return;
    }

    circles -= cost;
    circlesPerClick += 1;
    moreCirclesLevel += 1;

    updateUI();
    saveGame();
}

function evenMoreCircles() {
    const cost = getEvenMoreCirclesCost();

    if (circles < cost) {
        return;
    }

    circles -= cost;
    evenMoreCirclesMulti += 1;
    evenMoreCirclesLevel += 1;

    updateUI();
    saveGame();
}

function evenEvenMoreCircles() {
    const cost = getEvenEvenMoreCirclesCost();

    if (circles < cost) {
        return;
    }

    circles -= cost;
    evenEvenMoreCirclesExponent += 1;
    evenEvenMoreCirclesLevel += 1;

    updateUI();
    saveGame();
}

function earnCirclesAutomatically() {
    const cost = getEarnCirclesAutomaticallyCost();

    if (circles < cost) {
        return;
    }

    circles -= cost;
    earnCirclesAutomaticallyLevel += 1;

    updateUI();
    saveGame();
}

// ====================
// Layer 1
// ====================

function rockReset() {
    if (circles < ROCK_RESET_REQUIREMENT) {
        return;
    }

    rocks += 1 * RT2048Multi;

    circles = 0;

    circlesPerClick = 1;
    moreCirclesLevel = 0;

    evenMoreCirclesLevel = 0;
    evenMoreCirclesMulti = 1;

    evenEvenMoreCirclesLevel = 0;
    evenEvenMoreCirclesExponent = 1;

    circlesShopUnlocked = false;

    updateUI();
    saveGame();
}

// ====================
// Layer 2
// ====================

function boosterReset() {
    if (rocks < getBoosterCost()) {
        return;
    }

    boosters += 1
    RT2048Multi *= 2
    rocks = 0

    circles = 0;

    circlesPerClick = 1;
    moreCirclesLevel = 0;

    evenMoreCirclesLevel = 0;
    evenMoreCirclesMulti = 1;

    evenEvenMoreCirclesLevel = 0;
    evenEvenMoreCirclesExponent = 1;

    circlesShopUnlocked = false;

    updateUI();
    saveGame();
}

// ====================
// Passive Income
// ====================

function passiveIncome() {
    circlesPerSecond = getCirclesPerSecond();

    circles += circlesPerSecond;

    updateUI();
}

// ====================
// Save / Load
// ====================

function saveGame() {
localStorage.setItem("circles", circles);
    localStorage.setItem("circlesPerClick", circlesPerClick);
    localStorage.setItem("moreCirclesLevel", moreCirclesLevel);
    localStorage.setItem("evenMoreCirclesLevel", evenMoreCirclesLevel);
    localStorage.setItem("evenMoreCirclesMulti", evenMoreCirclesMulti);
    localStorage.setItem("evenEvenMoreCirclesLevel", evenEvenMoreCirclesLevel);
    localStorage.setItem("evenEvenMoreCirclesExponent", evenEvenMoreCirclesExponent);
    localStorage.setItem("earnCirclesAutomaticallyLevel", earnCirclesAutomaticallyLevel);

localStorage.setItem("rocks", rocks);

localStorage.setItem("boosters", boosters);

localStorage.setItem("RT2048Multi", RT2048Multi);
    localStorage.setItem("circlesShopUnlocked", circlesShopUnlocked);
}

function loadGame() {
    circles = Number(localStorage.getItem("circles")) || 0;
    circlesPerClick = Number(localStorage.getItem("circlesPerClick")) || 1;
    moreCirclesLevel = Number(localStorage.getItem("moreCirclesLevel")) || 0;
    evenMoreCirclesLevel = Number(localStorage.getItem("evenMoreCirclesLevel")) || 0;
    evenMoreCirclesMulti = Number(localStorage.getItem("evenMoreCirclesMulti")) || 1;
    evenEvenMoreCirclesLevel = Number(localStorage.getItem("evenEvenMoreCirclesLevel")) || 0;
    evenEvenMoreCirclesExponent = Number(localStorage.getItem("evenEvenMoreCirclesExponent")) || 1;
    earnCirclesAutomaticallyLevel = Number(localStorage.getItem("earnCirclesAutomaticallyLevel")) || 0;
    rocks = Number(localStorage.getItem("rocks")) || 0;
    boosters = Number(localStorage.getItem("boosters")) || 0;
    RT2048Multi = Number(localStorage.getItem("RT2048Multi")) || 1;
    circlesShopUnlocked = localStorage.getItem("circlesShopUnlocked") === "true";

    updateUI();
}

// ====================
// Game Start
// ====================

loadGame();

setInterval(passiveIncome, 1000);
setInterval(saveGame, 5000);