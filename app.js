const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.results')
let currentShooterIndex = 202;
const width = 15;
let direction = 1;
let invaderId;
let goingRight = true;

for(let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for(let i= 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add('invader')
    }
}

draw()

function remove() {
    for(let i= 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')

    // use modulus width
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width-1) currentShooterIndex +=1
            break;
    }
    squares[currentShooterIndex].classList.add('shooter')

}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;
    remove()

    if (rightEdge && goingRight) {
        for ( let i = 0; i< alienInvaders.length; i++) {
            alienInvaders[i] += width +1
            // change direction.
            direction = -1;
            goingRight = false;
        }
    }
    if (leftEdge && !goingRight) {
        for ( let i = 0; i< alienInvaders.length; i++) {
            alienInvaders[i] += width -1
            // change direction.
            direction = 1;
            goingRight = true;
        }
    }
    // for each
    for(let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] +=direction
    }
    draw()

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML= 'GAME OVER'
        clearInterval(invaderId)
    }

    for(let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > squares.length) {
            resultDisplay.innerHTML = 'GAME OVER'
            clearInterval(invaderId)
        }
    }
 }

invaderId = setInterval(moveInvaders, 500)

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser')

        }
        switch(e.key) {
            case 'ArrowUp':
                laserId = setInterval(moveLaser, 100)
        }
    }


document.addEventListener('keydown', shoot)