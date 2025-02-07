let selectedButton = 1; // Start with the middle button selected
let lastKeyPressTime = 0; // Store last key press time
let delayTime = 300; // Delay time in milliseconds

function title() {
    // Background
    image(menu, 200, 0, 1920, 1080); // Display the GIF as the background

    // Button positions and images
    let buttons = [
        { x: 1520, y: 880, scene: 'exit', image: tastoExit1, selectedImage: tastoExit2 },  // exit
        { x: 1020, y: 880, scene: 'controls', image: tastoControls1, selectedImage: tastoControls2 }, // controls
        { x: 520, y: 880, scene: 'salvo', image: tastoPlay1, selectedImage: tastoPlay2 } // playe
    ];

    // Draw buttons with selection effect
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];

        // Use the selected image if highlighted
        let imgToDraw = selectedButton === i ? button.selectedImage : button.image;
        image(imgToDraw, button.x, button.y, imgToDraw.width / 2, imgToDraw.height / 2);
    }

    // Custom key navigation function
    navigateWithKeys();
}

// Custom function to handle key navigation with delay
function navigateWithKeys() {
    // Get the current time
    let currentTime = millis();

    // Only allow navigation if the delay has passed
    if (currentTime - lastKeyPressTime > delayTime) {
        if (keyIsPressed) {
            // Move right with 'D', but stop at the last button (index 2)
            if (key === 'a'&& selectedButton < 2) {
                selectedButton++; // Move right
                lastKeyPressTime = currentTime; // Update the last key press time
            }
            // Move left with 'A', but stop at the first button (index 0)
            if (key === 'd'&& selectedButton > 0) {
                selectedButton--; // Move left
                lastKeyPressTime = currentTime; // Update the last key press time
            }
            
        }
    }

    // Press 'Enter' (13) or 'Q' (81) to select
    if (keyIsDown(13) || keyIsDown(81)) {
        let scenes = ['exit', 'controls', 'salvo'];
        if (selectedButton === 0) {
            scene = scenes[selectedButton];
            // Close the web page if "exit" is selected
            window.close();
        } else {
            // Change to the selected scene
            scene = scenes[selectedButton];
        }
    }
}
