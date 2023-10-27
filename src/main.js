//Jaren Kawai

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
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

let game = new Phaser.Game(config);

const batVelocity = 300;

let keyS;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let p1bat = null;
let cursors;
let batDirection = "down";
let batMovement = "idle";

