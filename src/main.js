//Jaren Kawai
//TITLE HERE
//Time spent to complete:
//Creative tilt explaination:
//Sources used:
//Time elapsed: https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/ 

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
    scene: [Title, Play, GameOver]
}

//new Phaser game
let game = new Phaser.Game(config);

//global variables
const batVelocity = 300;

let keyS, keyR;

let p1Score = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let p1bat = null;
let cursors;
let batDirection = "down";
let batMovement = "idle";

