document.addEventListener('DOMContentLoaded', function() {
    // Define paths to MP3 files
    const audioFiles = {
        'ping': 'assets/ping.wav',
        'koe': 'assets/koe.mp3',
        'krokodil': 'assets/krokodil.mp3',
        'poes': 'assets/poes.mp3',
        'leeuw': 'assets/leeuw.mp3',
        'giraf': 'assets/giraf.mp3'
    };

    // Create Audio objects for each sound
    const audioObjects = {};
    for (const key in audioFiles) {
        audioObjects[key] = new Audio(audioFiles[key]);
    }

    // Define positionSounds array to map reel positions to their corresponding sound files
    const positionSounds = [
        { position: 0, sound: audioObjects['koe'] },
        { position: -204, sound: audioObjects['krokodil'] },
        { position: -408, sound: audioObjects['poes'] },
        { position: -612, sound: audioObjects['leeuw'] },
        { position: -816, sound: audioObjects['giraf'] },
        { position: -1020, sound: audioObjects['koe'] }
    ];

    const redSlot = document.querySelector('.slot.red');
    const yellowSlot = document.querySelector('.slot.yellow');
    const blueSlot = document.querySelector('.slot.blue');
    const greenSlot = document.querySelector('.slot.green');
    const colorBorder = document.getElementById('colorborder');
    const choiceCircle = document.getElementById('choicecircle');
    const buttons = document.querySelectorAll('.custom-button'); // Get all buttons
    const undoButton = document.getElementById('undoButton'); // Get the Undo button
    const soundButton = document.getElementById('soundButton'); // Get the sound button
    const reel = document.querySelector('.reel');
    const successOverlay = document.getElementById('success');
    const errorOverlay = document.getElementById('error');
    let clickCount = 0; // Variable to track the number of button clicks
    let overlayVisible = false; // Variable to track whether the overlay is visible
    let slotColors = []; // Array to store slot colors
    let selectedPositions = [];

    // Function to toggle the sound button
    function toggleSoundButton() {
        soundButton.classList.toggle('active');
    }

    // Event listener for the sound button
    soundButton.addEventListener('click', function() {
        toggleSoundButton();
    });

    // Event listener for down button
    document.getElementById('down').addEventListener('click', function() {
        moveReelAndPlaySound(-204);
    });

    // Event listener for up button
    document.getElementById('up').addEventListener('click', function() {
        moveReelAndPlaySound(204);
    });

    // Function to move the reel and play sound
    function moveReelAndPlaySound(direction) {
        const currentPosition = parseInt((reel.style.transform.match(/-?\d+/) || [])[0]) || 0;
        const newPosition = currentPosition + direction;

        // Move the reel to the new position
        reel.style.transform = `translateY(${newPosition}px)`;

        // Play the sound for the new position
        playSoundForPosition(newPosition);
    }

    // Function to play sound for the current reel position
    function playSoundForPosition(position) {
        const matchingSound = positionSounds.find(sound => sound.position === position);
        if (matchingSound && soundButton.classList.contains('active')) {
            matchingSound.sound.currentTime = 0; // Reset the audio to the beginning
            matchingSound.sound.play() // Play the sound
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        }
    }

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add the 'pressed' class to the button
            button.classList.add('pressed');

            // Remove the 'pressed' class after 1 second
            setTimeout(() => {
                button.classList.remove('pressed');
            }, 200);
        });
    });

    // Event listener for the choice circle
    choiceCircle.addEventListener('click', function() {
        if (!overlayVisible) {
            // Increase click count
            clickCount++;

            // Get the current reel position
            const currentPosition = parseInt((reel.style.transform.match(/-?\d+/) || [])[0]) || 0;

            // Check if the clicked position matches the correct position for the current click count
            if (clickCount === 1) {
                // Position for first click is -612
            } else if (clickCount === 2) {
                // Position for second click is -408
            } else if (clickCount === 3) {
                // Position for third click is -816
            } else if (clickCount === 4) {
                // Position for fourth click is -204
            }


            // Update slot colors and border color
            slotColors.push(getSlotColor(clickCount));
            updateSlotsColors();

            // Store the selected position
            selectedPositions.push(currentPosition);

            // Check if all clicks have been made
            if (clickCount === 4) {
                overlayVisible = true; // Prevent further clicks

                // Check if the selected positions match the correct combination
                const correctCombination = [-612, -408, -816, -204];
                if (JSON.stringify(selectedPositions) === JSON.stringify(correctCombination)) {
                    // Display success overlay if the combination is correct
                    displayOverlay(successOverlay);
                } else {
                    // Display error overlay if the combination is incorrect
                    displayOverlay(errorOverlay);
                }
            }
        }
    });

    // Function to get slot color based on click count
    function getSlotColor(count) {
        switch (count) {
            case 1:
                return '#EB3148';
            case 2:
                return '#FCB201';
            case 3:
                return '#3ABFF0';
            case 4:
                return '#2EC998';
            default:
                return 'transparent';
        }
    }

    // Function to display the overlay
    function displayOverlay(overlay) {
        overlayVisible = true;
        if (overlay) {
            overlay.style.display = 'block';
        }
    }

    // Event listener for the Undo button
    undoButton.addEventListener('click', function() {
        // Reset click count and overlay visibility
        clickCount = 0;
        overlayVisible = false;
        // Reset slot colors and border color
        slotColors = [];
        colorBorder.style.backgroundColor = '#EB3148';
        // Reset the selected positions
        selectedPositions = [];
        // Hide the success overlay if visible
        if (successOverlay) {
            successOverlay.style.display = 'none';
        }
        // Hide the error overlay if visible
        if (errorOverlay) {
            errorOverlay.style.display = 'none';
        }
    });

    // Function to update slot colors
    function updateSlotsColors() {
        redSlot.style.backgroundColor = slotColors[0] || 'transparent';
        yellowSlot.style.backgroundColor = slotColors[1] || 'transparent';
        blueSlot.style.backgroundColor = slotColors[2] || 'transparent';
        greenSlot.style.backgroundColor = slotColors[3] || 'transparent';
    }

});
