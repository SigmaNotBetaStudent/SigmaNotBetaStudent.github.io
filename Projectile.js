// Projectile class
class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.width = 20; // Bullet width
        this.height = 5; // Bullet height
        this.direction = direction; // Left (-1) or right (1) direction
        this.speed = 20; // Bullet speed
    }

    update() {
        this.x += this.speed * this.direction; // Move the bullet based on direction and speed
    }

    display() {
        fill(216,64,64); // Bullet color
        rect(this.x, this.y+120, this.width, this.height); // Draw the bullet
    }
}