//esercizi
let video;
let bodypose;
let poses = [];
let connections;

let tolerance = 100;
let startTime;
let endTime = 40000; // 30 secondi

// Queste variabili verranno usate per definire la dimensione e il gap dei quadrati
let squareSize = 150;
let gap = 60;
let targetPositions = []; // Le coordinate verranno calcolate in setup dopo che conosciamo le dimensioni del video

let trasformazioneGambe;
let x, y;
let salvo;
let font;
let salvoImg;
let dialogueIndex = 0;
let dialogues = []; // Verrà inizializzato da Dialogues[1]
const Dialogues = {
    1 : [
        "Uè, sò Salvo 'a fata! Sarò il tuo aiutante in questo percorso.",
        "Tanto tiempo fa, nel lontano 136 d.P. (dopo Pizza), la società era divisa in 4 scaffali:",
        "'o scaffale d'o pane, 'o scaffale degli spuntini, 'o scaffale d'o vegetale e 'o scaffale d'o latte.",
        "'O scaffale d'o pane, cioè da dove sei venuto tu, si trova in cima ed è il luogo più sicuro.",
        "'O scaffale d'o latte, il più in basso, è infestato da nemici, come mozzarelle e scamorze.",
        "'O scaffale d'o vegetale, è protetto da un cavolo rosso, che non lascia scampo a nessuno.",
        "Nnò scaffale degli spuntini si trova la porta per il luogo sicuro, la tua casa.",
        "Te aiuterò a sviluppà diverse capacità... ci vedimmo più tardi!"
    ],
    2 : [
        "Mio caro Roberto, pe' continuà hai da fà chest'esercizio pe' 'e gambe",
        "Segui i movimenti do video:"
    ]
};

function preload() {
    font = loadFont("../assets/PixelOperator.ttf");
    salvoImg = loadImage("../images/SalvoLaFata.gif");
    trasformazioneGambe = loadImage("../images/RobertoPane_trasformazioneGambe.gif");
    bodypose = ml5.bodyPose();
}

function setup() {
    // Creazione del canvas e impostazione del video
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(440 * 1.5, 330 * 1.5);  // Dimensione fissa: 660 x 495
    video.hide();
    bodypose.detectStart(video, gotPoses);
    connections = bodypose.getConnections();
    startTime = millis();

    x = width / 2 - (salvoImg.width / 2);
    y = height / 2 - (salvoImg.height);

    // Verifica se la classe Salvo esiste
    if (typeof Salvo !== "undefined") {
        salvo = new Salvo(x, y);
    } else {
        console.error("Errore: la classe Salvo non è definita.");
    }

    dialogues = Dialogues[2]; // Inizializza i dialoghi

    // Calcola le coordinate dei quadrati in base alle dimensioni del video:
    // I quadrati dovranno essere centrati orizzontalmente nel video e posizionati in basso.
    let totalWidth = 2 * squareSize + gap;
    let startX = (video.width - totalWidth) / 2;
    let startY = video.height - squareSize;  // In modo che il quadrato tocchi il bordo inferiore
    targetPositions = [
        {
            leftX: startX,
            topY: startY,
            rightX: startX + squareSize,
            bottomY: video.height
        },
        {
            leftX: startX + squareSize + gap,
            topY: startY,
            rightX: startX + squareSize + gap + squareSize,
            bottomY: video.height
        }
    ];
}

function draw() {
    background(0);
    salvo.show();
    
    
    if (dialogueIndex < dialogues.length) {
        salvo.dialogue(dialogues[dialogueIndex]);
    } else {
        // Inverti l'immagine del video per creare l'effetto specchio
        openVideo();
        translate(width, 0);
        scale(-1, 1);
        image(video, 0, 0, video.width, video.height);

        drawSquares();
        
        // Disegna le connessioni e i keypoints rilevati
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            for (let j = 0; j < connections.length; j++) {
                let pointAIndex = connections[j][0];
                let pointBIndex = connections[j][1];
                let pointA = pose.keypoints[pointAIndex];
                let pointB = pose.keypoints[pointBIndex];
            
                if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                    stroke(255, 0, 0);
                    strokeWeight(2);
                    line(pointA.x, pointA.y, pointB.x, pointB.y);
                }
            }
        }
        
        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            for (let j = 0; j < pose.keypoints.length; j++) {
                let keypoint = pose.keypoints[j];
                if (keypoint.confidence > 0.1) {
                    fill(0, 255, 0);
                    noStroke();
                    circle(keypoint.x, keypoint.y, 10);
                }
            }
        }
        
        checkFootPosition();

        if (millis() - startTime > endTime) {
            console.log("⏰ Tempo scaduto! Esercizio terminato.");
            noLoop();
            clear();
            openVideoTrasformazione();
            setTimeout(function(){ window.close(); }, 4500);
        }
    }
    
    
}

function keyPressed() {
    if (key === 'q' && dialogueIndex < dialogues.length) {
        dialogueIndex++;
    }
}

// Disegna i due quadrati
function drawSquares() {
    for (let target of targetPositions) {
        fill(255, 0, 0, 100); // Rosso trasparente
        stroke(0); 
        strokeWeight(2);
        rect(target.leftX, target.topY, target.rightX - target.leftX, target.bottomY - target.topY);
    }
}

function gotPoses(results) {
    poses = results;
}

function checkFootPosition() {
    let insideAnySquare = false;

    for (let target of targetPositions) {
        let feetInside = 0;

        for (let i = 0; i < poses.length; i++) {
            let pose = poses[i];
            let leftAnkle = pose.keypoints[15];
            let rightAnkle = pose.keypoints[16];

            if (leftAnkle.confidence > 0.1 && rightAnkle.confidence > 0.1) {
                let leftInside =
                    leftAnkle.x >= target.leftX &&
                    leftAnkle.x <= target.rightX &&
                    leftAnkle.y >= target.topY &&
                    leftAnkle.y <= target.bottomY;

                let rightInside =
                    rightAnkle.x >= target.leftX &&
                    rightAnkle.x <= target.rightX &&
                    rightAnkle.y >= target.topY &&
                    rightAnkle.y <= target.bottomY;

                if (leftInside) feetInside++;
                if (rightInside) feetInside++;

                if (feetInside === 2) {
                    insideAnySquare = true;
                }
            }
        }

        if (feetInside === 2) {
            fill(0, 255, 0, 100); // Verde trasparente se entrambi i piedi sono dentro
        } else {
            fill(255, 0, 0, 100);
        }

        stroke(0);
        strokeWeight(0);
        rect(target.leftX, target.topY, target.rightX - target.leftX, target.bottomY - target.topY);
    }

    if (insideAnySquare) {
        drawCorrectMessage();
        console.log("✅ Entrambi i piedi sono nello stesso quadrato!");
    } else {
        drawIncorrectMessage();
        console.log("❌ Piedi non allineati nel quadrato!");
    }
}
let videoOpened = false;
let videoTrasformazioneOpened = false;
function openVideo(){
    if (!videoOpened) {
        let videoWindow = window.open("../videos/VideoEsercizio1.mp4", "_blank", "width=660,height=495");
        setTimeout(function(){ videoWindow.close(); }, 12000);
        videoOpened = true;
    }
}
function openVideoTrasformazione() {
    if (!videoTrasformazioneOpened) {
        let videoWindow = window.open("../videos/RobertoPane_trasformazioneGambe.mp4", "_blank", "width=1700,height=900");
        
        let audio = new Audio("../audios/trasformazione.mp3");
        audio.play();
        
        setTimeout(function() {
            videoWindow.close();
            audio.pause();
        }, 4500);
        
        videoTrasformazioneOpened = true;
    }
}

function drawCorrectMessage() {
    push();
    scale(-1, 1);
    textSize(32);
    fill(0, 255, 0); // Verde
    textAlign(CENTER, CENTER);
    text("Entrambi i piedi sono nello stesso quadrato", -width / 2, height - 50);
    pop();
}
function drawIncorrectMessage() {
    push();
    scale(-1, 1);
    textSize(32);
    fill(255, 0, 0); // Rosso
    textAlign(CENTER, CENTER);
    text("Piedi non allineati nel quadrato", -width / 2, height - 50);
    pop();
}