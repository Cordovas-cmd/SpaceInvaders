
// document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('.results')
    const rules = document.querySelector('.rules');
    let currentShooterIndex = 202;
    
    const width = 15;
    let direction = 1;
    let invaderId;
    let goingRight = true;
    let aliensDestroyed = []
    let results = 0
    var sounds= new Array,
    explosion = new Audio("./sounds/explosion.wav");
    var song = new Audio("./songs/rcrs.mp3");
    song.volume = 0.5;
    var start = document.querySelector(".start");
    
    
    
    
    // song.addEventListener('loadeddata', () => {
    //     let duration = song.duration;
    // });
    
    // song.play();
    
    start.addEventListener('click', () => {
        invaderId = setInterval(moveInvaders, 500)
        song.play();
        
    })
    
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
            // if alien does not include one of the index of aliensDestroyed then draw.
            if(!aliensDestroyed.includes(i))
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
                rules.classList.add('hide');
                resultDisplay.innerHTML = 'GAME OVER'
                clearInterval(invaderId)
            }
        }
    
        if(aliensDestroyed.length === alienInvaders.length) {
            rules.classList.add('hide');
            resultDisplay.innerHTML = 'You saved the planet!!'
            clearInterval(invaderId)
    
        }
     }
    
    // invaderId = setInterval(moveInvaders, 500)
    
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;


        function moveLaser() {
           
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser')
            console.log(currentLaserIndex)
    
            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')
                explosion.currentTime = 0;
                if(squares[currentLaserIndex].classList.contains('boom')) {
                    playQueuedSounds();
                }
                if(!squares[currentLaserIndex]) {
                 squares[currentLaserIndex] = currentShooterIndex;
                }
               
               
                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
                clearInterval(laserId)
    
                const alienDestroyed = alienInvaders.indexOf(currentLaserIndex)
                aliensDestroyed.push(alienDestroyed)
                sounds.push(explosion)
    // console.log(sounds)
                results++
                resultDisplay.innerHTML = results
              
                // playQueuedSounds();
            }
        }
            switch(e.key) {
                case 'ArrowUp':
                    laserId = setInterval(moveLaser, 100)
                    // song.play()
            }
            if(e.keyCode === 32) {
                e.preventDefault();
                laserId = setInterval(moveLaser, 100)
                // song.play()
               }
        }
    
        function playQueuedSounds() {
            if (sounds.length === 0) return;
            var sound = sounds.pop(); // get last sound and remove it
            sound.play();
            // console.log(sounds)
            sound.onended = function() { // go look at the queue again once current sound is finished
                playQueuedSounds();
                song.play();
            };
        }
    
    
    document.addEventListener('keydown', shoot) 
// })
    
    // future have to fix the laser index
    
    
    // want to add levels.
    
    // need to have a background that changes 
    
    // different enemy attack patterns and different enemies
    
    // different music and tracks
    
    // need speed and difficulty to increase
    
    
    // would like to add power ups.