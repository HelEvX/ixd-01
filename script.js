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

    // Get the sound button and voice button
    const soundButton = document.getElementById('soundButton');
    const voiceButton = document.getElementById('voiceButton');

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
    }

    // Function to play the corresponding sound based on the reel position
    function playReelSound() {
        const currentPosition = Math.floor(reelContainer.scrollTop / scrollDistance);
        let soundToPlay;
        switch (currentPosition) {
            case 0:
                soundToPlay = girafSound;
                break;
            // Add cases for other positions here
            default:
                console.error('Invalid reel position.');
                return;
        }
        // Play the sound if both soundButton and voiceButton are active
        if (voiceButton.classList.contains('active')) {
            soundToPlay.currentTime = 0; // Reset the audio to the beginning
            soundToPlay.play(); // Play the corresponding sound
        }
    }

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

        // Play wheel sound
        playWheelSound();

        // Add a small movement downwards to the button
        setTimeout(() => {
            downButton.style.transform = 'translateY(4px)';
        }, 100);
        setTimeout(() => {
            downButton.style.transform = 'translateY(0)';
        }, 200);

        // Animate scrolling to the next position
        animateScroll(targetScrollTop, 1000);
    });

    // Event listener for the UP button
    upButton.addEventListener('click', function() {
        let targetScrollTop = reelContainer.scrollTop - scrollDistance;
        if (targetScrollTop < 0) {
            targetScrollTop = 0; // Ensure we don't scroll above the first position
        }

        // Play wheel sound
        playWheelSound();

        // Add a small movement downwards to the button
        setTimeout(() => {
            upButton.style.transform = 'translateY(4px)';
        }, 100);
        setTimeout(() => {
            upButton.style.transform = 'translateY(0)';
        }, 200);

        // Animate scrolling to the previous position
        animateScroll(targetScrollTop, 1000);
    });

    if (soundButton && voiceButton) {
        soundButton.addEventListener('click', function() {
            const isActive = soundButton.classList.toggle('active');
            voiceButton.classList.toggle('active', isActive);

            if (isActive) {
                soundButton.style.backgroundColor = 'darkgrey';
                soundButton.querySelector('svg').style.fill = 'black';
                voiceButton.querySelector('svg').style.fill = 'black';
            } else {
                soundButton.style.backgroundColor = 'white';
                soundButton.querySelector('svg').style.fill = 'grey';
                voiceButton.style.backgroundColor = 'white';
                voiceButton.querySelector('svg').style.fill = 'grey';
            }
        });
    }

    // Event listener for the voice button
    if (voiceButton) {
        voiceButton.addEventListener('click', function() {
            voiceButton.classList.toggle('active');
        });
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const redSlot = document.querySelector('.slot.red');
    const yellowSlot = document.querySelector('.slot.yellow');
    const blueSlot = document.querySelector('.slot.blue');
    const greenSlot = document.querySelector('.slot.green');
    const colorBorder = document.getElementById('colorborder');
    const choiceCircle = document.getElementById('choicecircle');
    let clickCount = 0; // Variable to track the number of button clicks
    let overlayVisible = false; // Variable to track whether the overlay is visible

    // Create Audio object for the ping sound
    const pingSound = new Audio('assets/ping.wav');

    if (redSlot && yellowSlot && blueSlot && greenSlot && colorBorder && choiceCircle) {
        choiceCircle.addEventListener('click', function() {
            if (!overlayVisible) {
                if (clickCount === 0 || clickCount === 4) {
                    // First click or when all slots are emptied: Turn the first slot red and border yellow
                    clickCount = 1; // Reset the click count to 1
                    redSlot.style.backgroundColor = 'red';
                    colorBorder.style.borderColor = 'yellow';
                    // Play ping sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 1) {
                    // Second click: Turn the second slot yellow and border blue, and fill the red slot
                    clickCount = 2; // Increment the click count to 2
                    yellowSlot.style.backgroundColor = 'yellow';
                    colorBorder.style.borderColor = 'blue';
                    redSlot.style.backgroundColor = 'red'; // Fill the red slot
                    // Play ping sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 2) {
                    // Third click: Turn the third slot blue and border green, and fill the red and yellow slots
                    clickCount = 3; // Increment the click count to 3
                    blueSlot.style.backgroundColor = 'blue';
                    colorBorder.style.borderColor = 'green';
                    redSlot.style.backgroundColor = 'red'; // Fill the red slot
                    yellowSlot.style.backgroundColor = 'yellow'; // Fill the yellow slot
                    // Play ping sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 3) {
                    // Fourth click: Turn the fourth slot green and display the overlay
                    clickCount = 4; // Increment the click count to 4
                    greenSlot.style.backgroundColor = 'green';
                    colorBorder.style.borderColor = 'green';
                    displayOverlay();
                }
            }
        });

        // Event listeners for each slot to make it empty again on click
        redSlot.addEventListener('click', function() {
            if (!overlayVisible && clickCount !== 4) {
                redSlot.style.backgroundColor = 'transparent';
                colorBorder.style.borderColor = 'red'; // Reset border color to red
                clickCount = 0; // Reset the click count when all slots are emptied
            }
        });

        yellowSlot.addEventListener('click', function() {
            if (!overlayVisible && clickCount !== 4) {
                yellowSlot.style.backgroundColor = 'transparent';
                colorBorder.style.borderColor = 'yellow'; // Reset border color to yellow
                clickCount = 1; // Reset the click count when the yellow slot is emptied
            }
        });

        blueSlot.addEventListener('click', function() {
            if (!overlayVisible && clickCount !== 4) {
                blueSlot.style.backgroundColor = 'transparent';
                colorBorder.style.borderColor = 'blue'; // Reset border color to blue
                clickCount = 2; // Reset the click count when the blue slot is emptied
            }
        });

        greenSlot.addEventListener('click', function() {
            if (!overlayVisible && clickCount !== 4) {
                greenSlot.style.backgroundColor = 'transparent';
                colorBorder.style.borderColor = 'green'; // Reset border color to green
                clickCount = 3; // Reset the click count when the green slot is emptied
            }
        });

        // Function to display the overlay
        function displayOverlay() {
            overlayVisible = true;
            const successOverlay = document.getElementById('success');
            if (successOverlay) {
                successOverlay.style.display = 'block';
            }
        }

        // Prevent default action for empty slots
        const emptySlots = document.querySelectorAll('.slot:not(.red):not(.yellow):not(.blue):not(.green)');
        emptySlots.forEach(slot => {
            slot.addEventListener('click', function(event) {
                event.preventDefault();
            });
        });
    } else {
        console.error('Slots, or color border not found.');
    }
});
