// Function to redirect to staticscreen.html after a delay
function redirectToStaticScreen() {
    // Wait for one second (1000 milliseconds) before redirecting
    setTimeout(function() {
        window.location.href = 'staticscreen.html';
    }, 1000); // Adjust the delay (in milliseconds) as needed
}

// Call the function to initiate the redirect
redirectToStaticScreen();
