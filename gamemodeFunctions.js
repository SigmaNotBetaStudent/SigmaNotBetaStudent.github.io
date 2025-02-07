let enemies = [];
let enemySpawned='false';
let enemySpawned2='false';
let enemySpawned3='false';

function gameMode(){
    if (scene === 'gameMode') {
        background(135, 206, 235);

        cameraX = constrain(playerX - width / 2, 0, 9500 - width); 
        
        push();
        translate(-cameraX, 0); 

        image(bgImg1, 0, 0, 9500, 1080);
        //esercizio1
        image(salvoImg, 2500, 800);
        if(scene === 'gameMode'){
            if(playerX>2500-salvoImg.width && playerX<2500+salvoImg.width){
                scene = 'esercizio1';
            }
        }
        

        isMoving = false;

        if (!isJumping && !isLanding) {
            if (keyIsDown(65)) {
                playerX = max(playerX - speed, width / 2);
                facingLeft = true;
                isMoving = true;
            }
            if (keyIsDown(68)) {
                playerX = min(playerX + speed, 9500 - width / 2);
                facingLeft = false;
                isMoving = true;
            }
            if (keyIsDown(80) || keyIsDown(27)) {
                if(scene==='gameMode')
                {
                    location.reload();
                }
            }
        }

        if (isJumping) {
            jumpVelocity -= gravity; 
            playerY -= jumpVelocity; 
            playerX += jumpDirection * 10; 

            if (jumpVelocity > 0) {
                jumpGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2); 
                jumpGif.show();
            }

            if (jumpVelocity <= 0) {
                jumpGif.hide();
                midAirGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                midAirGif.show();
            }

            if (playerY >= groundY) {
                playerY = groundY;
                isJumping = false;
                isLanding = true;

                jumpGif.hide();
                midAirGif.hide();

                landingGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                landingGif.show();

                setTimeout(() => {
                    isLanding = false;
                    landingGif.hide();
                }, 500);
            }
        }

        playerGif.hide();
        playerStaticGif.hide();

        if (!isJumping && !isLanding) {
            if (isMoving) {
                playerGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerGif.show();
            } else {
                playerStaticGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerStaticGif.show();
            }
        }

        // Update and display projectiles (bullets)
        for (let projectile of projectiles) {
            projectile.update();
            projectile.display();
        }
        
        showEndGif();

        pop(); 
    }
    if (scene === 'gameMode2') {
        endGif.hide();
        //showStartGif();
        //startGif.hide();
        
        background(135, 206, 235); 

        cameraX = constrain(playerX - width / 2, 0, 8715 - width); 
        
        push();
        translate(-cameraX, 0); 

        image(bgImg2, 0, 0, 9500, 1080); 

        isMoving = false;

        if (!isJumping && !isLanding) {
            if (keyIsDown(65)) {
                playerX = max(playerX - speed, width / 2);
                facingLeft = true;
                isMoving = true;
            }
            if (keyIsDown(68)) {
                playerX = min(playerX + speed, 9500 - width / 2);
                facingLeft = false;
                isMoving = true;
            }
            if (keyIsDown(80) || keyIsDown(27)) {
                if(scene==='gameMode2')
                {
                    location.reload();
                }
            }
        }

        if (isJumping) {
            jumpVelocity -= gravity; 
            playerY -= jumpVelocity; 
            playerX += jumpDirection * 10; 

            if (jumpVelocity > 0) {
                jumpGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2); 
                jumpGif.show();
            }

            if (jumpVelocity <= 0) {
                jumpGif.hide();
                midAirGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                midAirGif.show();
            }

            if (playerY >= groundY) {
                playerY = groundY;
                isJumping = false;
                isLanding = true;

                jumpGif.hide();
                midAirGif.hide();

                landingGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                landingGif.show();

                setTimeout(() => {
                    isLanding = false;
                    landingGif.hide();
                }, 500);
            }
        }

        playerGif.hide();
        playerStaticGif.hide();

        if (!isJumping && !isLanding) {
            if (isMoving) {
                playerGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerGif.show();
            } else {
                playerStaticGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerStaticGif.show();
            }
        }

        // Update and display projectiles (bullets)
        for (let projectile of projectiles) {
            projectile.update();
            projectile.display();
        }
        
        showEndGif();
        pop(); 
    }
    if (scene === 'gameMode3') {
        endGif.hide();
        //clear();
        background(135, 206, 235);  

        // Spawn multiple enemies at different positions
        if(enemySpawned2==='false')
            {
                let xPos=2000;  // Spawn enemies along the level
                enemies.push(new Enemy(xPos, groundY));
                enemySpawned2='true';
            }

        image(bgImg3, 0, 0,2300, 1080); 

        isMoving = false;

        // Update movement logic with correct boundaries
        if (!isJumping && !isLanding) {
            if (keyIsDown(65)) {  // Move left
                playerX = max(playerX - speed, 0);  // Prevent going off the left side
                facingLeft = true;
                isMoving = true;
            }
            if (keyIsDown(68)) {  // Move right
                playerX = min(playerX + speed, width - playerWidth);  // Prevent going off the right side
                facingLeft = false;
                isMoving = true;
            }
            if (keyIsDown(80) || keyIsDown(27)) {
                if (scene === 'gameMode3') {
                    location.reload();
                }
            }
        }

        // Jump logic (keep horizontal movement separate from jumping)
        if (isJumping) {
            // Allow movement while jumping
            if (keyIsDown(65)) {  // Move left
                playerX = max(playerX - speed, 0);
                facingLeft = true;
            }
            if (keyIsDown(68)) {  // Move right
                playerX = min(playerX + speed, width - playerWidth);
                facingLeft = false;
            }
        
            // Jump physics
            jumpVelocity -= gravity;
            playerY -= jumpVelocity;
        
            // Update GIF positions to match playerX
            if (jumpVelocity > 0) {
                jumpGif.position(playerX, (playerY+130 ) - playerHeight / 2);
                jumpGif.show();
            }
        
            if (jumpVelocity <= 0) {
                jumpGif.hide();
                midAirGif.position(playerX, (playerY+130 ) - playerHeight / 2);
                midAirGif.show();
            }
        
            // Landing logic
            if (playerY >= groundY) {
                playerY = groundY;
                isJumping = false;
                isLanding = true;
        
                jumpGif.hide();
                midAirGif.hide();
        
                landingGif.position(playerX, (playerY+130 )- playerHeight / 2);
                landingGif.show();
        
                setTimeout(() => {
                    isLanding = false;
                    landingGif.hide();
                }, 500);
            }
        }
        

        // Show player based on movement state
        playerGif.hide();
        playerStaticGif.hide();

        if (!isJumping && !isLanding) {
            if (isMoving) {
                playerGif.position(playerX, playerY);  // Use playerX for horizontal position
                playerGif.show();
            } else {
                playerStaticGif.position(playerX, playerY);  // Use playerX for static position
                playerStaticGif.show();
            }
        }

        // ** Update and Display Enemies **
        for (let i = enemies.length - 1; i >= 0; i--) {
            let enemy = enemies[i];
            enemy.update();
            enemy.display();

            // ** Collision Handling **
            if (checkCollision(playerX, playerY, playerWidth, playerHeight, enemy.x, enemy.y, enemy.w, enemy.h)) {
                if (jumpVelocity < 0) { 
                    // If player is falling and lands on the enemy
                    enemies.splice(i, 1);  // Remove defeated enemy
                    jumpVelocity = -12;    // Bounce effect
                } else {
                    // If player collides from the side, game over
                    gameOver = true;
                }
            }
        }
        /*
        // Update and display projectiles (bullets)
        for (let projectile of projectiles) {
            projectile.update();
            projectile.display();
        }
        pop();*/
 
    }
    if (scene === 'gameMode4') {
        endGif.hide();
        //clear();
        background(135, 206, 235); 

        cameraX = constrain(playerX - width / 2, 0, 8715 - width); 
        
        push();
        translate(-cameraX, 0); 

        image(bgImg4, 0, 0, 9500, 1080); 

        isMoving = false;

        if (!isJumping && !isLanding) {
            if (keyIsDown(65)) {
                playerX = max(playerX - speed, width / 2);
                facingLeft = true;
                isMoving = true;
            }
            if (keyIsDown(68)) {
                playerX = min(playerX + speed, 9500 - width / 2);
                facingLeft = false;
                isMoving = true;
            }
            if (keyIsDown(80) || keyIsDown(27)) {
                if(scene==='gameMode4')
                {
                    location.reload();
                }
            }
        }

        if (isJumping) {
            jumpVelocity -= gravity; 
            playerY -= jumpVelocity; 
            playerX += jumpDirection * 10; 

            if (jumpVelocity > 0) {
                jumpGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2); 
                jumpGif.show();
            }

            if (jumpVelocity <= 0) {
                jumpGif.hide();
                midAirGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                midAirGif.show();
            }

            if (playerY >= groundY) {
                playerY = groundY;
                isJumping = false;
                isLanding = true;

                jumpGif.hide();
                midAirGif.hide();

                landingGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                landingGif.show();

                setTimeout(() => {
                    isLanding = false;
                    landingGif.hide();
                }, 500);
            }
        }

        playerGif.hide();
        playerStaticGif.hide();

        if (!isJumping && !isLanding) {
            if (isMoving) {
                playerGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerGif.show();
            } else {
                playerStaticGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
                playerStaticGif.show();
            }
        }

        // Update and display projectiles (bullets)
        for (let projectile of projectiles) {
            projectile.update();
            projectile.display();
        }
        
        
        showEndGif();

        pop(); 
    }
}


class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 300;
        this.h = 300;
        this.speed = -random(1, 3); // Always move left by setting speed to a negative value
    }

    update() {
        this.x += this.speed; // Move the enemy left

        // Stop the enemy when it reaches the left side of the canvas (x <= 0)
        if (this.x <= 0) {
            this.x = 0;  // Prevent the enemy from going off-screen
        }
    }
    
    display() {
        if(scene==='gameMode')
            {
                    image(enemy3Gif, this.x, this.y, this.w, this.h); // Draw enemy
            }
        if(scene==='gameMode2')
            {
                    image(enemy1Gif, this.x, this.y, this.w, this.h); // Draw enemy
            }
        if(scene==='gameMode3')
            {
                    image(enemy2Gif, this.x, this.y, this.w, this.h); // Draw enemy
            }
    }
}

// ** Collision Function **
function checkCollision(px, py, pw, ph, ex, ey, ew, eh) {
    return px < ex + ew && px + pw > ex && py < ey + eh && py + ph > ey;
}

function showEndGif() {
    // Check if player reaches the end of the canvas
    if(scene==='gameMode')
    {
            if (playerX >= 9500 - width / 2 ) {
                endGif.show();
                // Set a 2-second delay before transitioning to 'gameMode2'
                setTimeout(() => {
                level2Start='true';
                endGif.hide();
                scene = 'gameMode2';  // Change scene after delay
            }, 2000); // 2000 milliseconds = 2 seconds
        } 
    }
    else if(scene==='gameMode2'){
            if (playerX >= 8715 - width / 2) {
                endGif.show();
                // Set a 2-second delay before transitioning to 'gameMode2'
                setTimeout(() => {
                endGif.hide();
                scene = 'gameMode3';  // Change scene after delay
            }, 2000); // 2000 milliseconds = 2 seconds
        } 
    }
    else {
        endGif.hide();
    }
}
function positionGIFs() {
    playerWidth = 50 * playerScalar;
    playerHeight = 50 * playerScalar;

    playerGif.size(playerWidth, playerHeight);
    playerStaticGif.size(playerWidth, playerHeight);
    playerGifGambe.size(53, playerHeight);
    playerStaticGifGambe.size(145, playerHeight);
    jumpGif.size(playerWidth, playerHeight);

    midAirGif.size(playerWidth, playerHeight);
    landingGif.size(playerWidth, playerHeight);

    playerGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
    playerStaticGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
    jumpGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
    midAirGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);
    landingGif.position(width / 2 - playerWidth / 2, playerY - playerHeight / 2);


    // Set up the end GIF
    //endGif = createImg('path_to_end_gif.gif');  // Add the correct path for your end GIF
    endGif.size(2300,1080); // Adjust size
    endGif.position(0,0); // Adjust position
}

// Handle Jump Logic
function keyPressed() {
    //salvo dialogue
    if(scene === 'salvo'|| scene === 'esercizio1'){
        if(key === 'q' || keyIsDown(13))
        {
            if(dialogueIndex < dialogues.length){
                dialogueIndex++;
            }
        }
    }
    if(scene === 'gameMode' || scene==='gameMode2' || scene==='gameMode3'|| scene==='gameMode3'){
        //spara
        if (key === 'q' && !isJumping && !isLanding) { 
            let direction = facingLeft ? -1 : 1; // Projectile direction based on facing
            let bulletX = playerX + (facingLeft ? -playerWidth / 2 : playerWidth / 2); // Adjust spawn based on direction
            let bulletY = playerY - playerHeight / 2; // Spawn at player's center vertically

            projectiles.push(new Projectile(bulletX, bulletY, direction)); // Spawn projectile
        }
        if (key === 'e' && !isJumping && !isLanding) { 
            isJumping = true;
            jumpVelocity = jumpPower;
            jumpGif.show();
            playerStaticGif.hide();
            playerGif.hide();
    
            if (keyIsDown(65)) {
                jumpDirection = -1;
            } else if (keyIsDown(68)) {
                jumpDirection = 1;
            } else {
                jumpDirection = 0;
            }
        }
        if (key === ' ' && !isJumping && !isLanding) { 
            isJumping = true;
            jumpVelocity = jumpPower;
            jumpGif.show();
            playerStaticGif.hide();
            playerGif.hide();
    
            if (keyIsDown(65)) {
                jumpDirection = -1;
            } else if (keyIsDown(68)) {
                jumpDirection = 1;
            } else {
                jumpDirection = 0;
            }
        }
    }
}