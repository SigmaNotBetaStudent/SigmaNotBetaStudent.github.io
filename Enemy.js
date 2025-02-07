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