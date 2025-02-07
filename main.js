//esercizi
let posX, posY;
let salvoEs1;
let esercizio1Aperto = false; // Flag di controllo



//salvo
let xSalvo, ySalvo;
let salvoBase;
let salvo;
let salvoImg;
let dialogueIndex = 0;
let dialogues = [];
const Dialogues = {
    first : [
        "Uè, sò Salvo 'a fata! Sarò il tuo aiutante in questo percorso.",
        "Tanto tiempo fa, nel lontano 136 d.P. (dopo Pizza), la società era divisa in 4 scaffali:",
        "'o scaffale d'o pane, 'o scaffale degli spuntini, 'o scaffale d'o vegetale e 'o scaffale d'o latte.",
        "'O scaffale d'o pane, cioè da dove sei venuto tu, si trova in cima ed è il luogo più sicuro.",
        "'O scaffale d'o latte, il più in basso, è infestato da nemici, come mozzarelle e scamorze.",
        "'O scaffale d'o vegetale, è protetto da un cavolo rosso, che non lascia scampo a nessuno.",
        "Nnò scaffale degli spuntini si trova la porta per il luogo sicuro, la tua casa.",
        "Te aiuterò a sviluppà diverse capacità... ci vedimmo più tardi!"
    ]
}

//player
let playerX, playerY;           // Player position
let speed = 20;                  // Player movement speed                
let cameraX = 0;                // Camera's x position
let isMoving = false;           // Flag to check if player is moving
let facingLeft = false;         // Direction flag
let playerWidth = 50;           // Player width
let playerHeight = 50;          // Player height
let playerScalar = 5;           // Scaling factor for the player

// Jump-related variables
let isJumping = false;
let isLanding = false;
let jumpVelocity = 5;
let gravity = 1;
let jumpPower = 30;
let groundY;
let jumpDirection = 0; 
let endGif;
let startGif;
let count='firstTime';
let count2='firstTime';
// Health variables
let playerHealth = 100;         // Player's starting health
let maxHealth = 100;            // Maximum health
let level2Start;

//run music once
let menuMusic = false;
let level1Music=false;
let level2Music=false;
let level3Music=false;
//determines which screen to play at the moment
let scene = 'title';

// Bullet-related variables
let projectiles = []; // Array to store projectiles

let salvoState='true';

function setup() {
    createCanvas(2300, bgImg1.height);
    //esercizi
    posX = width/2-(salvoImg.width / 2);
    posY = height/2-(salvoImg.height);
    salvoEs1 = new Salvo(posX, posY);

    //video.loop();
    video.hide();

    playerX = width / 2;
    playerY = (height / 2) + 260;
    groundY = playerY;
    //salvo
    xSalvo =  width/2 - (salvoImg.width/2);
    ySalvo = height/2 - salvoImg.height;
    salvo = new Salvo(xSalvo, ySalvo);
    dialogues = Dialogues.first;

    positionGIFs();
}

function draw() {
    //loops title page
if (scene === 'title') {
    if (!menuMusic) {
        playMusic(0);
        menuMusic = true;
    }
    title();
} 
//loops instructions page
else if (scene === 'controls') {
    controls();
}
//esercizio 1
else if (scene === 'esercizio1') {
    if (menuMusic) {
        soundFormats('mp3');
        music[0].stop();
        menuMusic = false;
    }
    apriEsercizio(1);
} 
//salvo
else if(scene ==='salvo'){
    
    if(salvoState==='true')
    {  
        clear();
        video.loop();
        let vidImg=video.get();
        image(vidImg,500,150);

        //video.loop();
        setTimeout(() => {
            video.pause();
            salvoState='false';
        }, 37000); // 2000 milliseconds = 2 seconds
    }
    else{
    background(0);
    salvo.show();
    if(dialogueIndex < dialogues.length){
        salvo.dialogue(dialogues[dialogueIndex]);
    }
    else{
        salvo.disappear();
        setTimeout(() => {
            dialogueIndex = 0;
            scene='gameMode';
        }, 5000); // 2000 milliseconds = 2 seconds
        
    }
    }
}
//loops gameMode page where the game starts
else if (scene === 'gameMode') {
    if (!level1Music) {
        playMusic(1);
        level1Music = true;
    }
    gameMode();
}
else if(scene==='gameMode2')
{
    if (playerX >= 9500 - width / 2) {
    if(count==='firstTime')
    {
    playerX=0;
    playerY=0;
    groundY=0;
    playerX = width / 2;
    playerY = (height / 2) + 260;
    groundY = playerY;
    count='done';
    if (!level2Music) {
        playMusic(2);
        level2Music = true;
    }
    }
    gameMode();
    }
    else{
        
        gameMode();
    }   
}
else if(scene==='gameMode3')
    {
        if (playerX >= 8750 - width / 2) {
        if(count2==='firstTime')
        {
        playerX=0;
        playerY=0;
        groundY=0;
        playerX = width / 2;
        playerY = (height / 2) + 160;
        groundY = playerY;
        count3='done';
        if (!level3Music) {
            playMusic(3);
            level3Music = true;
        }
        }
        gameMode();
        }
        else{
            
            gameMode();
        }   
    }
} 

function apriEsercizio(numero) {
    if (numero === 1 && !esercizio1Aperto) { // Controlla se non è stato già eseguito
        window.open("./esercizi/esercizio1/esercizio1.html", "_blank");
        playerX += 500;
        playerGif.hide();
        playerStaticGif.hide();
        playerGif = playerGifGambe;
        playerStaticGif = playerStaticGifGambe;
        
        esercizio1Aperto = true; // Imposta il flag per impedire esecuzioni multiple
    }
}


