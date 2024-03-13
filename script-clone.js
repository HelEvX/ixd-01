document.addEventListener("DOMContentLoaded", function() {
    const reel = document.querySelector(".reel");
    const images = reel.querySelectorAll("img");
    const upButton = document.getElementById("up");
    const downButton = document.getElementById("down");
    const imageHeight = images[0].clientHeight + 4; // Account for the extra 4 pixels
    const totalImages = images.length;
    const reelHeight = totalImages * imageHeight;
    const cloneImages = [...images].map(image => image.cloneNode(true));

    // Append cloned images to the end of the reel
    cloneImages.forEach(clone => reel.appendChild(clone));

    let currentPosition = 0;

    function moveUp() {
        currentPosition += imageHeight;
        const remainder = currentPosition % imageHeight;
        currentPosition -= remainder;
        reel.style.transition = "transform 0.5s ease-in-out";
        reel.style.transform = `translateY(${currentPosition}px)`;
    }

    function moveDown() {
        currentPosition -= imageHeight;
        const remainder = currentPosition % imageHeight;
        currentPosition -= remainder;
        reel.style.transition = "transform 0.5s ease-in-out";
        reel.style.transform = `translateY(${currentPosition}px)`;
    }


    upButton.addEventListener("click", moveUp);
    downButton.addEventListener("click", moveDown);

    // Reset the position to the original after transition ends
    reel.addEventListener("transitionend", function() {
        if (currentPosition <= -reelHeight) {
            currentPosition = 0;
            reel.style.transition = "none";
            reel.style.transform = `translateY(${currentPosition}px)`;
        } else if (currentPosition >= 0) {
            currentPosition = -reelHeight + imageHeight;
            reel.style.transition = "none";
            reel.style.transform = `translateY(${currentPosition}px)`;
        }
    });
});
