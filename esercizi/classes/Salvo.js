class Salvo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = salvoImg; // Usa l'immagine caricata in preload()
        this.text = new TextDisplay();
        this.scaleFactor = 2; // Fattore di scala per ingrandire l'immagine (puoi modificarlo)
    }

    show() {
        // Disegna l'immagine ingrandita
        image(this.img, this.x, this.y, this.img.width * this.scaleFactor, this.img.height * this.scaleFactor);
    }

    disappear() {
        this.y -= 5;
    }

    dialogue(testo) {
        this.text.setText(testo);
        this.text.drawWords();
    }
}