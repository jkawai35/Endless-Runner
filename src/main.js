//Jaren Kawai
//TITLE HERE
//Time spent to complete:
//Creative tilt explaination:
//Sources used:
//Time elapsed: https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/ 
//Rounding decimal numbers: https://www.tutorialspoint.com/How-to-format-a-number-with-two-decimals-in-JavaScript#:~:text=number%20in%20JavaScript%20%E2%88%92-,Math.,be%20formatted%20with%20two%20decimals. 

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    render: {
        pixelArt: true
    },
    scene: [Title, Play, Credits, GameOver]
}

//new Phaser game
let game = new Phaser.Game(config);

//global variables
const batVelocity = 300;

let keyS, keyR, keyC, keyESC, keyUP, keyDOWN;

let p1Score = 0;
let topSurvive = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let p1bat = null;
let cursors;
let batDirection = "down";
let batMovement = "idle";
let timeSurvived = 0;

