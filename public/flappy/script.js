document.addEventListener('DOMContentLoaded', () => {
    // assigning each class to a constant for future reference 
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    // setting beginning variables
    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;

    // at start, bird will drop by 2, be left by 220, and down 100
    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    // setInterval runs startGame every 20 ms
    // Gives the gravity effect by dropping by 2 each run (in function)
    // setting into timerID gives us a way to stop it later (using clearInterval)
    let timerID = setInterval(startGame, 20);

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

    // creating new div element with class obstacle
    // obstacle is right of sky (left 500) and has a random height each time
    // appendChild puts the obstacle div into the game-container
    function generateObstacle() {
        const obstacle = document.createElement('div');
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        obstacle.classList.add('obstacle');
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        // moves the obstacles to the left
        // if obstacle is at end of screen to the left, stop running moveObstacale and remove it
        
        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerID);
                gameDisplay.removeChild(obstacle);
            } 
        }
        // timerID can be used again since it is within a different function/chunk
        // run generateObstacle every 3 seconds
        let timerID = setInterval(moveObstacle, 20);
        setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

});
