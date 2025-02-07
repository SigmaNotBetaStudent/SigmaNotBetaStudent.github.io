let spaceLastPressTime = 0; // Store the last time SPACE was pressed
let spaceDelayTime = 300; // Delay time in milliseconds (300ms)

let font;
let fontsize = 60;
let parola = "";

let keyImages = {};

function controls() {
    //createCanvas(1520, 844);
    textAlign(CENTER, CENTER);

    //font = loadFont('./assets/PixelOperator.ttf');

    textFont(font);
    textSize(fontsize);

    // Background
    //image(creditsGif, 100, 0, 1920, 1080); // Display the GIF as the background

    //visione bottoni

    background(30);
    fill(255);
    textSize(60);

    text("Comandi del Gioco", 1150, 40);

    textSize(40);
    
    let commands = [
        { key: "E", action: "Salto" },
        { key: "Q", action: "Spara" },
        { key: "A", action: "Muoviti a sinistra" },
        { key: "D", action: "Muoviti a destra" }
    ];
    
    let cols = 2;
    let rows = 2;
    let spacingX = width / cols;
    let spacingY = (height - 80) / rows;
    
    for (let i = 0; i < commands.length; i++) {
        let x = (i % cols) * spacingX + spacingX / 2;
        let y = Math.floor(i / cols) * spacingY + 100;
        
        if (keyImages[commands[i].key]) {
        image(keyImages[commands[i].key], x -100 , y + 50 , 350, 350);
        }
        text(commands[i].action, x - 250, y + 200 );
    }

    // Button properties
    let button = {
        x: 1920,
        y: 1000,
        image: tastoBack1, // Default button image
        selectedImage: tastoBack2 // Image when selected
    };

    // Button selection logic using 'P' (80) or 'Backspace' (8) with delay
    let currentTime = millis(); // Get the current time

    if (scene === 'controls') {
        // Check if 'P' or 'Backspace' is pressed and delay has passed
        if ((keyIsDown(80) || keyIsDown(8)) && (currentTime - spaceLastPressTime > spaceDelayTime)) {
            createCanvas(2300, bgImg1.height);
            
            scene = 'title'; // Go back to the title screen
            spaceLastPressTime = currentTime; // Update key press time
        }
    }

    // Check if the button is "selected" (if it's the only button, it's always selected)
    let imgToDraw = scene === 'controls' ? button.selectedImage : button.image;
    
    // Draw the button
    image(imgToDraw, button.x, button.y, imgToDraw.width / 3, imgToDraw.height / 3);
    
}
