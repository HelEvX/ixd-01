document.addEventListener('DOMContentLoaded', function() {
    const redSlot = document.querySelector('.slot.red');
    const yellowSlot = document.querySelector('.slot.yellow');
    const blueSlot = document.querySelector('.slot.blue');
    const greenSlot = document.querySelector('.slot.green');
    const colorBorder = document.getElementById('colorborder');
    const choiceCircle = document.getElementById('choicecircle');
    const undoButton = document.getElementById('undoButton'); // Get the Undo button
    const soundButton = document.getElementById('soundButton'); // Get the sound button
    let clickCount = 0; // Variable to track the number of button clicks
    let overlayVisible = false; // Variable to track whether the overlay is visible

    // Create Audio object for the ping sound
    const pingSound = new Audio('assets/ping.wav');

    if (redSlot && yellowSlot && blueSlot && greenSlot && colorBorder && choiceCircle && undoButton && soundButton) {
        choiceCircle.addEventListener('click', function() {
            if (!overlayVisible) {
                if (clickCount === 0 || clickCount === 4) {
                    // First click or when all slots are emptied: Turn the first slot red and border yellow
                    clickCount = 1; // Reset the click count to 1
                    redSlot.style.backgroundColor = '#EB3148';
                    colorBorder.style.backgroundColor = '#FCB201';
                    // Check if sound button is toggled on before playing sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 1) {
                    // Second click: Turn the second slot yellow and border blue, and fill the red slot
                    clickCount = 2; // Increment the click count to 2
                    yellowSlot.style.backgroundColor = '#FCB201';
                    colorBorder.style.backgroundColor = '#3ABFF0';
                    redSlot.style.backgroundColor = '#EB3148'; // Fill the red slot
                    // Check if sound button is toggled on before playing sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 2) {
                    // Third click: Turn the third slot blue and border green, and fill the red and yellow slots
                    clickCount = 3; // Increment the click count to 3
                    blueSlot.style.backgroundColor = '#3ABFF0';
                    colorBorder.style.backgroundColor = '#2EC998';
                    redSlot.style.backgroundColor = '#EB3148'; // Fill the red slot
                    yellowSlot.style.backgroundColor = '#FCB201'; // Fill the yellow slot
                    // Check if sound button is toggled on before playing sound
                    if (soundButton.classList.contains('active')) {
                        pingSound.currentTime = 0; // Reset the audio to the beginning
                        pingSound.play(); // Play the ping sound
                    }
                } else if (clickCount === 3) {
                    // Fourth click: Turn the fourth slot green and display the overlay
                    clickCount = 4; // Increment the click count to 4
                    greenSlot.style.backgroundColor = '#2EC998';
                    colorBorder.style.backgroundColor = '#2EC998';
                    displayOverlay();
                }
            }
        });

        // Event listener for the Undo button
        undoButton.addEventListener('click', function() {
            // Reset all slot backgrounds to transparent
            redSlot.style.backgroundColor = 'transparent';
            yellowSlot.style.backgroundColor = 'transparent';
            blueSlot.style.backgroundColor = 'transparent';
            greenSlot.style.backgroundColor = 'transparent';
            // Reset colorBorder to its initial color
            colorBorder.style.backgroundColor = '#EB3148';
            // Reset click count and overlay visibility
            clickCount = 0;
            overlayVisible = false;
            // Hide the success overlay if visible
            const successOverlay = document.getElementById('success');
            if (successOverlay) {
                successOverlay.style.display = 'none';
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
    } else {
        console.error('Slots, color border, choice circle, undo button, or sound button not found.');
    }
});
