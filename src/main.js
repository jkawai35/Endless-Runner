//Jaren Kawai
//Fright or Flight
//Time spent to complete: 22 hours

//Creative tilt explaination: One of the aspects of the game that I was proud of was increasing the difficulty of the
//game based on score rather than time. The hardest part was getting the difficulty to update as soon as the player had a score
//divisable by 10 because if I coded based on Nathan's examples, the difficulty would update late and would often skip difficulty
//levels because the players score would no longer be divisable by 10 by the time the callback function executed. There is also
//a feature where the game will randomly spawn in a different type of monster. As the game progresses, the chance of the second type
//of monster spawning gets higher, so the longer that you play, the more likely it is to have to dodge the second type of monster too.
//This was also difficult for me to implemement at first because either too many monsters would spawn at once, or they would spawn
//when I didn't want them too. Chance to spawn at start - 25%, chance to spawn at 70 second mark - 100%. Monsters have chance to spawn
//every 5 seconds.

//I also haven't really designed my own assets for games before, so I was rather proud of the
//pixel art that I was able to do for this project despite the fact that it may not be the best. I also wanted to try and
//make my own music for this project, so I produced the looping background music myself. I typically work with electronic and pop music
//so although I was out of my confort zone genre wise for this project, I still wanted to get practice creating music for games.

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
            debug: false,
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

let keyS, keyR, keyC, keyESC, keyUP, keyDOWN, keyM;

let p1Score = 0;
let topSurvive = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let p1bat = null;
let cursors;
let batDirection = "down";
let batMovement = "idle";
let timeSurvived = 0;
let chance = 7;
let difficulty;

