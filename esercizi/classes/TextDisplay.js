class TextDisplay {
    constructor() {
        this.text = "";
    }

    drawWords() {
        // Disegna sempre il rettangolo, anche se il testo è vuoto
        let rectX = 0;
        let rectY = height * (2 / 3);
        let rectW = width;
        let rectH = height / 3;

        fill(255);
        rect(rectX, rectY, rectW, rectH);

        if (this.text !== "") {
            fill(0);
            textFont(font);
            textAlign(CENTER, CENTER);
            textSize(50); // Imposta la dimensione del testo (puoi cambiare il valore a tuo piacimento)
            text(this.text, rectX + rectW / 2, rectY + rectH / 2);
        }
    }

    setText(text) {
        this.text = text;
    }

    clearText() {
        this.text = ""; // Svuota il testo
    }
}