//Jaren Kawai

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Title, Play, GameOver]
}

let game = new Phaser.Game(config);

let keyUP, keyDOWN, keyS;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;