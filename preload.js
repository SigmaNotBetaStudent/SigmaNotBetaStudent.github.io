//preload.js

//image variables
let logo;
let creditsGif; // Added for the credits background
let backButtonImg;
let video;
// Define new GIF variable for the end of the game




let tastoBack1,tastoBack2,tastoBack3;
let tastoControls1,tastoControls2,tastoControls3;
let tastoExit1,tastoExit2,tastoExit3;
let tastoPlay1,tastoPlay2,tastoPlay3;


//audio variables
let music = [];
let soundEffects = [];

function preload(){
	//player
	// Load assets
    playerGif = createImg('images/player-animations/RobertoPaneRotola.gif');
    playerGif.hide();
    playerStaticGif = createImg('images/player-animations/RobertoPaneStanding.gif');
    playerStaticGif.hide();
    jumpGif = createImg('images/player-animations/JumpStart.gif');
    jumpGif.hide();
    midAirGif = createImg('images/player-animations/MidAir.gif');
    midAirGif.hide();
    landingGif = createImg('images/player-animations/Landing.gif');
    landingGif.hide();
    playerGifGambe = createImg("./images/player-animations/RobertoPane_cammina.gif");
    playerGifGambe.hide();
    playerStaticGifGambe = createImg("./images/player-animations/RobertoPane_gambato.gif");
    playerStaticGifGambe.hide();
    

    
    tastoBack1=loadImage('images/tasti/tastoBack.png');
    tastoBack2=loadImage('images/tasti/tastoBackSelezionato.png');

    tastoControls1=loadImage('images/tasti/tastoControls.png');
    tastoControls2=loadImage('images/tasti/tastoControlsSelezionato.png');

    tastoExit1=loadImage('images/tasti/tastoExit.png');
    tastoExit2=loadImage('images/tasti/tastoExitSelezionato.png');

    tastoPlay1=loadImage('images/tasti/tastoPlay.png');
    tastoPlay2=loadImage('images/tasti/tastoPlaySelezionato.png');

    //salvo
    salvoImg = loadImage('./images/SalvoLaFata.gif');
    salvoBase = loadImage('./images/SalvoLaFata.gif');



    //enemy1Gif = createImg('images/EvilScamorza.gif'); // Load enemy GIF
    enemy2Gif = createImg('images/enemy-animations/EvilMelanzana.gif'); // Load enemy GIF
    enemy2Gif.hide();
    enemy3Gif = createImg('images/enemy-animations/EvilMozzarella.gif'); // Load enemy GIF
    enemy3Gif.hide();

    backButtonImg = loadImage("images/tastoExitSelezionato.png"); // Load your PNG file
    endGif=createImg('images/backgrounds/end.gif');
    endGif.hide();
    startGif=createImg('images/backgrounds/start.gif');
    startGif.hide();

    bgImg1 = loadImage('images/backgrounds/sfondoLatticini.png');
    bgImg2 = loadImage('images/backgrounds/SfondoVerdure.png');  
    bgImg3=loadImage('images/backgrounds/SfondoBossBattleCavolo.png');
    bgImg4=loadImage('images/backgrounds/SfondoSnack.png');

	//music
	music[0] = loadSound("audio/music/SchermataTitolo.mp3");
	music[1] = loadSound("audio/music/livello1.mp3");
    music[2] = loadSound("audio/music/livello2.mp3");
    music[3] = loadSound("audio/music/livello3.mp3");

	// Credits background GIF (NEW)
    menu=loadImage("images/backgrounds/1.gif")
	creditsGif = loadImage("images/backgrounds/creditsGif.gif");

    //menu key 
    keyImages["E"] = loadImage("images/tasti/JoystickSalto.png");
    keyImages["Q"] = loadImage("images/tasti/JoystickSparo.png");
    keyImages["A"] = loadImage("images/tasti/joystickSinistra.png");
    keyImages["D"] = loadImage("images/tasti/joystickDestra.png");
    //menu font
    font = loadFont('./assets/PixelOperator.ttf');

    // //esercizio1
    // bodyposeEs1 = ml5.bodyPose();
    // EsercizioVideo1 = createVideo("Esercizio1.mp4");
    // EsercizioVideo1.hide();
    //video
    video=createVideo("paneDef.mp4");
    video.hide(); 
}//preload