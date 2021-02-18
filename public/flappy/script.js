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
    let timerId = setInterval(startGame, 20);

    // adding 50 to the bird height on jump
    function jump() {
        birdBottom += 50;
        bird.style.bottom = birdBottom + 'px'
    }
    // on key up, do the jump function
    document.addEventListener('keyup', jump);
});