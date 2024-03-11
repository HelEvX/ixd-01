document.addEventListener('DOMContentLoaded', function() {
    // Create Audio objects for each sound effect
    const wheelSound = new Audio('assets/wheel.wav');
    const girafSound = new Audio('assets/giraf.mp3');
    const koalaSound = new Audio('assets/koala.mp3');
    const tijgerSound = new Audio('assets/tijger.mp3');
    const pandaSound = new Audio('assets/panda.mp3');
    const leeuwSound = new Audio('assets/leeuw.mp3');

    // Get the reel container
    const reelContainer = document.getElementById('wheel');

    // Get the DOWN and UP buttons
    const downButton = document.getElementById('down');
    const upButton = document.getElementById('up');

    // Get the sound button
    const soundButton = document.getElementById('soundButton');

    // Define the distance between scrolls
    const scrollDistance = 200;

    // Function to play the wheel sound
    function playWheelSound() {
        // Check if the sound button is active before playing the sound
        if (soundButton && !soundButton.classList.contains('active')) {
            return;
        }
        wheelSound.currentTime = 0; // Reset the audio to the beginning
        wheelSound.play(); // Play the wheel sound
        setTimeout(function() {
            girafSound.play(); // Play the giraf sound after 1000 milliseconds (1 second)
        }, 1000);
    }

    // Check if the reel container and buttons exist
    if (reelContainer && downButton && upButton) {
        // Function to animate scrolling with ease-in and ease-out effect
        function animateScroll(targetScrollTop, duration) {
            const startTime = performance.now();
            const originalScrollTop = reelContainer.scrollTop;

            function scrollStep(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeInOutProgress = easeInOut(progress);
                reelContainer.scrollTop = originalScrollTop + (targetScrollTop - originalScrollTop) * easeInOutProgress;
                if (elapsed < duration) {
                    requestAnimationFrame(scrollStep);
                }
            }

            requestAnimationFrame(scrollStep);
        }

        // Easing function for smooth scroll
        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Event listener for the DOWN button
        downButton.addEventListener('click', function() {
            let targetScrollTop = reelContainer.scrollTop + scrollDistance;
            if (targetScrollTop >= reelContainer.scrollHeight - reelContainer.clientHeight) {
                targetScrollTop = reelContainer.scrollHeight - reelContainer.clientHeight; // Prevent scrolling beyond the last position
            }

            // Animate scrolling to the next position
            animateScroll(targetScrollTop, 1000);

            // Play wheel sound
            playWheelSound();

            // Add a small movement downwards to the button
            setTimeout(() => {
                downButton.style.transform = 'translateY(4px)';
            }, 100);
            setTimeout(() => {
                downButton.style.transform = 'translateY(0)';
            }, 200);
        });

        // Event listener for the UP button
        upButton.addEventListener('click', function() {
            let targetScrollTop = reelContainer.scrollTop - scrollDistance;
            if (targetScrollTop < 0) {
                targetScrollTop = 0; // Ensure we don't scroll above the first position
            }

            // Animate scrolling to the previous position
            animateScroll(targetScrollTop, 1000);

            // Play wheel sound
            playWheelSound();

            // Add a small movement downwards to the button
            setTimeout(() => {
                upButton.style.transform = 'translateY(4px)';
            }, 100);
            setTimeout(() => {
                upButton.style.transform = 'translateY(0)';
            }, 200);
        });
    } else {
        console.error('Reel container or buttons not found.');
    }

    // Event listener for the sound button
    if (soundButton) {
        soundButton.addEventListener('click', function() {
            const isActive = soundButton.classList.toggle('active');

            if (isActive) {
                soundButton.style.backgroundColor = 'darkgrey';
                soundButton.querySelector('svg').style.fill = 'black';
            } else {
                soundButton.style.backgroundColor = 'white';
                soundButton.querySelector('svg').style.fill = 'grey';
            }
        });
    }

});
