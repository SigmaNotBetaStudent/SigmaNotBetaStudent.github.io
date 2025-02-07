//sound.js

function playMusic(sceneNum){
	if(sceneNum === 0) {
		//menu
		music[0].loop();
	}
	if (sceneNum === 1){
		music[0].stop();
		music[1].loop();
	}
	else if (sceneNum === 2){
		music[1].stop();
		music[2].play();
		//music[0].stop();
		
	}
	else if (sceneNum === 3){
		music[2].stop();
		music[3].play();
		//music[0].stop();
		//music[1].stop();
		
	}
}//playMusic