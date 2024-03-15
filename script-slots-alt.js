document.addEventListener('DOMContentLoaded', function() {
    // Define paths to MP3 files
    const audioFiles = {
        'ping': 'assets/ping.wav',
        'koe': 'assets/koe.mp3',
        'krokodil': 'assets/krokodil.mp3',
        'poes': 'assets/poes.mp3',
        'leeuw': 'assets/leeuw.mp3',
        'giraf': 'assets/giraf.mp3',
        'success': 'assets/success.wav',
        'error': 'assets/error.wav'
    };

    // Create Audio objects for each sound
    const audioObjects = {};
    for (const key in audioFiles) {
        audioObjects[key] = new Audio(audioFiles[key]);
    }

    // Define positionSounds array to map reel positions to their corresponding sound files
    const positionSounds = [
        { position: 0, sound: audioObjects['koe'] },
        { position: -264, sound: audioObjects['krokodil'] },
        { position: -528, sound: audioObjects['poes'] },
        { position: -792, sound: audioObjects['leeuw'] },
        { position: -1056, sound: audioObjects['giraf'] },
        { position: -1320, sound: audioObjects['koe'] }
    ];

    const redSlot = document.querySelector('.slot.red');
    const yellowSlot = document.querySelector('.slot.yellow');
    const blueSlot = document.querySelector('.slot.blue');
    const greenSlot = document.querySelector('.slot.green');
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
        moveReelAndPlaySound(-264);
    });

    // Event listener for up button
    document.getElementById('up').addEventListener('click', function() {
        moveReelAndPlaySound(264);
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

            // Play ping sound only if the sound button is toggled ON
            if (soundButton.classList.contains('active') && clickCount < 4) {
                audioObjects['ping'].currentTime = 0; // Reset the audio to the beginning
                audioObjects['ping'].play(); // Play the ping sound
            }

            // Get the current reel position
            const currentPosition = parseInt((reel.style.transform.match(/-?\d+/) || [])[0]) || 0;

            // Call changeBorderColor to update the border color
            changeBorderColor();

            // Check if the clicked position matches the correct position for the current click count
            if (clickCount === 1) {
                // Position for first click is -792
            } else if (clickCount === 2) {
                // Position for second click is -528
            } else if (clickCount === 3) {
                // Position for third click is -1056
            } else if (clickCount === 4) {
                // Position for fourth click is -264
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
                const correctCombination = [-792, -528, -1056, -264];
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
                return '#FE536B';
            case 2:
                return '#fdb651';
            case 3:
                return '#529fff';
            case 4:
                return '#66cd5c';
            default:
                return 'transparent';
        }
    }

    // Function to change the stroke color of the circle
    function changeBorderColor() {
        // Only update the border color if the success overlay is not visible
        if (!overlayVisible) {
            let borderColor;
            switch (clickCount) {
                case 1:
                    borderColor = '#fdb651'; // Color for click 1
                    break;
                case 2:
                    borderColor = '#529fff'; // Color for click 2
                    break;
                case 3:
                    borderColor = '#66cd5c'; // Color for click 3
                    break;
                default:
                    borderColor = '#FE536B'; // Default color
                    break;
            }
            // Apply the color to the border
            choiceCircle.style.borderColor = borderColor;
        }
    }

    // Function to redirect to static screen
    function redirectToStaticScreen() {
        window.location.href = 'staticscreen.html';
    }

    // Function to display the overlay
    function displayOverlay(overlay) {
        overlayVisible = true;
        if (overlay) {
            overlay.style.display = 'block';
            if (overlay === successOverlay) {
                if (soundButton.classList.contains('active')) {
                    playSound('success');
                    choiceCircle.style.borderColor = '#66cd5c'; // Set border color to green
                }
                // Redirect to static screen after about one second
                setTimeout(redirectToStaticScreen, 2000);
            } else if (overlay === errorOverlay && soundButton.classList.contains('active')) {
                playSound('error');
            }
        }
    }

    // Function to play sound
    function playSound(soundName) {
        const sound = audioObjects[soundName];
        if (sound) {
            sound.currentTime = 0; // Reset the audio to the beginning
            sound.play(); // Play the sound
        }
    }

    // Event listener for the Undo button
    undoButton.addEventListener('click', function() {
        // Reset click count and overlay visibility
        clickCount = 0;
        overlayVisible = false;
        // Reset slot colors to transparent
        slotColors = [];
        updateSlotsColors(); // Update slot colors after resetting
        // Reset slot colors and border color
        slotColors = [];
        changeBorderColor(); // Reset border color
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
