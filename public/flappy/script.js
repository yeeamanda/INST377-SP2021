document.addEventListener('DOMContentLoaded', () => {
    // assigning each class to a constant for future reference
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    // setting beginning variables
    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 440;

    // at start, bird will drop by 2, be left by 220, and down 100
    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    // setInterval runs startGame every 20 ms
    // Gives the gravity effect by dropping by 2 each run (in function)
    // setting into gametimerID gives us a way to stop it later (using clearInterval)
    let gametimerID = setInterval(startGame, 20);

    // if spacebar (32) is pressed, run jump function
    function control(e) {
        if (e.keyCode == 32) {
            jump()
        }
    }

    // adding 50 to the bird height on jump IF height less than 500
    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px'
    }
    // on key up, do the control function (which does jump function)
    document.addEventListener('keyup', control);

    // creating new div elements (top and bottom obstacle)
    // div element given class obstacle if game is not over (isGameOver is false)
    // obstacle is right of sky (left 500) and has a random height each time
    // appendChild puts the obstacle div into the game-container
    // style of each obstacle is same, top is pushed up by the gap
    function generateObstacle() {
        const obstacle = document.createElement('div');
        const topobstacle = document.createElement('div');
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topobstacle.classList.add('topobstacle');
        }    
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topobstacle);
        obstacle.style.left = obstacleLeft + 'px'
        topobstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topobstacle.style.bottom = obstacleBottom + gap + 'px'

        // moves the obstacles to the left
        // if obstacle is at end of screen to the left, stop running moveObstacle and remove it
        // if bird height is 0, end game (gameOver function)
        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px'
            topobstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerID);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topobstacle);
            } 
            /* if obstacle is in same position (horizontally) as bird,
             end game and stop obstacle from moving */
            if (
                // eslint-disable-next-line no-mixed-operators
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                // eslint-disable-next-line no-mixed-operators
                (birdBottom < obstacleBottom + 153|| birdBottom > obstacleBottom + gap -209)|| 
                birdBottom === 0) {
                    gameOver();
                clearInterval(timerID);
            }
        }
        // timerID can be used again since it is within a different function/chunk
        // run generateObstacle every 3 seconds IF isGameOver is false (not ended)
        let timerID = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    // stop startGame function from running
    // remove the spacebar event listener (can't use spacebar anymore to jump)
    function gameOver() {
        clearInterval(gametimerID);
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }
});
