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
        { position: -816, sound: audioObjects['giraf'] }
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
    const images = reel.querySelectorAll('img');
    const successOverlay = document.getElementById('success');
    const errorOverlay = document.getElementById('error');
    let clickCount = 0; // Variable to track the number of button clicks
    let overlayVisible = false; // Variable to track whether the overlay is visible
    let selectedImages = [];

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
        const currentPosition = parseInt(reel.style.transform.match(/-?\d+/)) || 0;
        const soundButtonActive = soundButton.classList.contains('active');
        const reelAtInitialPosition = currentPosition === 0;

        if (reelAtInitialPosition && soundButtonActive) {
            audioObjects['krokodil'].currentTime = 0; // Reset the audio to the beginning
            audioObjects['krokodil'].play(); // Play the krokodil sound
        }

        // Move the reel down
        moveReelAndPlaySound(-204);
    });

    // Function to move the reel and play sound
    function moveReelAndPlaySound(direction) {
        const currentPosition = parseInt(reel.style.transform.match(/-?\d+/)) || 0;
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
            // Play ping sound only if the sound button is toggled ON
            if (soundButton.classList.contains('active')) {
                audioObjects['ping'].currentTime = 0; // Reset the audio to the beginning
                audioObjects['ping'].play(); // Play the ping sound
            }

            // Handle other functionality for choiceCircle button
            if (clickCount === 0 || clickCount === 4) {
                // First click or when all slots are emptied: Turn the first slot red and border yellow
                clickCount = 1; // Reset the click count to 1
                redSlot.style.backgroundColor = '#EB3148';
                colorBorder.style.backgroundColor = '#FCB201';
            } else if (clickCount === 1) {
                // Second click: Turn the second slot yellow and border blue, and fill the red slot
                clickCount = 2; // Increment the click count to 2
                yellowSlot.style.backgroundColor = '#FCB201';
                colorBorder.style.backgroundColor = '#3ABFF0';
                redSlot.style.backgroundColor = '#EB3148'; // Fill the red slot
            } else if (clickCount === 2) {
                // Third click: Turn the third slot blue and border green, and fill the red and yellow slots
                clickCount = 3; // Increment the click count to 3
                blueSlot.style.backgroundColor = '#3ABFF0';
                colorBorder.style.backgroundColor = '#2EC998';
                redSlot.style.backgroundColor = '#EB3148'; // Fill the red slot
                yellowSlot.style.backgroundColor = '#FCB201'; // Fill the yellow slot
            } else if (clickCount === 3) {
                // Fourth click: Turn the fourth slot green and display the overlay
                clickCount = 4; // Increment the click count to 4
                greenSlot.style.backgroundColor = '#2EC998';
                colorBorder.style.backgroundColor = '#2EC998';
                displayOverlay();
            }
        }
    });

    // Function to display the overlay
    function displayOverlay() {
        overlayVisible = true;
        if (successOverlay) {
            successOverlay.style.display = 'block';
        }
    }

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
        if (successOverlay) {
            successOverlay.style.display = 'none';
        }
        // Hide the error overlay if visible
        if (errorOverlay) {
            errorOverlay.style.display = 'none';
        }
    });

    // Event listeners for reel images
    images.forEach(image => {
        image.addEventListener('click', function() {
            const selectedImageId = image.getAttribute('id');
            if (!selectedImages.includes(selectedImageId)) {
                selectedImages.push(selectedImageId);
                image.classList.add('selected');
                if (selectedImages.length === 4) {
                    // Check if the selected images form a valid combination
                    if (isValidCombination(selectedImages)) {
                        successOverlay.style.display = 'block'; // Display success overlay
                    } else {
                        errorOverlay.style.display = 'block'; // Display error overlay
                    }
                }
            }
        });
    });

    // Function to check if the selected images form a valid combination
    function isValidCombination(selectedImages) {
        // Define the valid combinations here
        const validCombinations = [
            ['leeuw', 'giraf', 'koe', 'krokodil']
        ];
        // Map selected image IDs to animal names
        const selectedAnimalNames = selectedImages.map(image => {
            // Extract animal name from image ID (assuming image IDs are in the format 'image-<animal>')
            return image.split('-')[1];
        });
        // Check if any of the valid combinations match the selected animal names
        return validCombinations.some(combination => {
            // Check if every animal in the combination is present in the selected animal names
            return combination.every(animal => selectedAnimalNames.includes(animal));
        });
    }
});
