document.addEventListener("DOMContentLoaded", function() {
    const reel = document.querySelector(".reel");
    const upButton = document.getElementById("up");
    const downButton = document.getElementById("down");
    const soundButton = document.getElementById('soundButton'); // Add sound button variable

    // Initial position of the reel
    let currentPosition = -104;

    // Function to move the reel up
    function moveUp() {
        currentPosition -= 204;
        reel.style.top = currentPosition + "px";
    }

    // Function to move the reel down
    function moveDown() {
        currentPosition += 204;
        reel.style.top = currentPosition + "px";
    }

    // Event listeners for the up and down buttons
    upButton.addEventListener("click", moveDown);
    downButton.addEventListener("click", moveUp);

    // Event listener for the sound button
    if (soundButton) {
        soundButton.addEventListener('click', function () {
            const isActive = soundButton.classList.toggle('active');

            if (isActive) {
                soundButton.style.backgroundColor = '#2EC998';
                soundButton.querySelector('svg').style.fill = 'black';
                // Add code to enable sound
            } else {
                soundButton.style.backgroundColor = 'white';
                soundButton.querySelector('svg').style.fill = 'grey';
                // Add code to disable sound
            }
        });
    }

});

