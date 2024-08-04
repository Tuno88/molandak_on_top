let fishCaught = 0;

document.addEventListener('DOMContentLoaded', () => {
    const castButton = document.getElementById('cast-button');
    const fishContainer = document.getElementById('fish-container');
    const message = document.getElementById('message');
    const score = document.getElementById('score');
    const notification = document.getElementById('notification');

    castButton.addEventListener('click', () => {
        fishContainer.innerHTML = '';

        let caughtFish = Math.random() < 0.5;

        if (caughtFish) {
            fishCaught += 1;
            score.textContent = `Moyaki Count: ${fishCaught}`;

            const fishInBucket = document.createElement('img');
            fishInBucket.src = './moyaki.gif';
            fishInBucket.classList.add('fish');

            showNotification('You caught a fish!', './moyaki.gif');
        } else {
            showNotification('No luck this time.<br>Try again!', './moyaki.gif');
        }
    });

    function createFish() {
        const fish = document.createElement('img');
        fish.src = './moyaki.gif';
        fish.classList.add('fish');
        fish.style.top = `${Math.random() * 100}%`;
        fishContainer.appendChild(fish);
        animateFish(fish);
    }

    function animateFish(fish) {
        const direction = Math.random() < 0.5 ? 1 : -1;
        // fish.style.transform = `scaleX(${direction})`;
        // Get the width of the fishing area
        const fishingAreaWidth = fishContainer.offsetWidth;
        // Calculate the start position based on direction and screen width
        let position = direction === 1 ? -fish.offsetWidth : fishingAreaWidth;
        fish.style.left = `${position}px`;

        function moveFish() {
            position += direction * 2;
            fish.style.left = `${position}px`;

            if (direction === 1 && position > fishingAreaWidth) {
                position = -50;
                
            } else if (direction === -1 && position < -50) {
                position = fishingAreaWidth;
            }
            fish.style.transform = `scaleX(${direction})`;
            requestAnimationFrame(moveFish);
        }

        moveFish();
    }

    function spawnFish() {
        createFish();
        setTimeout(spawnFish, Math.random() * 5000); // Spawn fish at random intervals up to 5 seconds
    }

    function showNotification(text, imgSrc) {
        notification.innerHTML = `<img src="${imgSrc}" alt="Notification Image">${text}`;

        // notification.textContent = text;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    spawnFish(); // Start spawning fish
});
