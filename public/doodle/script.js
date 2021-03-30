const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
let doodlerSpaceLeft = 50;
let doodlerSpaceBottom = 250;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerId;

function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = doodlerSpaceLeft + 'px';
    doodler.style.bottom = doodlerSpaceBottom + 'px';
}

//Create a new class Platform that denotes the platform locations
//appendChild appends one element to another
class Platform {
    constructor(platformBottom) {
        this.bottom = platformBottom;
        this.left = Math.random() * 315 //Platform width 85, grid 400. Left space must be at most 315 to fit. random will give random number up to 315.
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
    }
}
//creates each new platform, other styles denoted in class Platform
//each new platform is pushed into the platforms array
function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = 600/platformCount; //Height of grid 600, space between each platform is equal
        let platformBottom = 100 + i * platformGap; //wouldn't the bottom for the top one be 700 which is outside of 600?
        let platform = new Platform(platformBottom);
        platforms.push(platform);
    }
}

//moving platforms if the doodler is above 200 px from bottom
//for each platform created, it moves down 4 px
function movePlatforms() {
    if (doodlerSpaceBottom > 200) {
        platforms.forEach(item => {
            item.bottom -= 4;
            let visual = item.visual;
            visual.style.bottom = item.bottom + 'px';
        })
    }
}

//first clear downTimerId since it will move down if above 350
//20px is added to space below doodler every 30ms
//if the space below doodler is above 350, make it fall
function jump() {
    clearInterval(downTimerId);
    upTimerId = setInterval(function() {
        doodlerSpaceBottom += 20;
        doodler.style.bottom = doodlerSpaceBottom + 'px';
        if (doodlerSpaceBottom > 350) {
            fall();
        }
    },30)
}

//clearInterval stops the setInterval
//doodler will stop going up 20px every 30ms
//Instead of going up it will go down by 5px
function fall () {
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
        doodlerSpaceBottom -= 5;
        doodler.style.bottom = doodlerSpaceBottom + 'px';
    })
}

function start() {
    if (isGameOver == false) {
        createDoodler()
        createPlatforms()
        setInterval(movePlatforms,30) //movePlatforms function is run every 30 seconds
        jump()
    }
}
start()