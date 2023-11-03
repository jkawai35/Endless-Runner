class GameOver extends Phaser.Scene{
    constructor(){
        super("gameOver")
    }

    preload(){
        //preload
        this.load.image("cave", "./assets/cave.png");
    }

    create(){
        //create
        //end game config
        let endConfig = {
            fontFamily: "fantasy",
            fontSize: "26px",
            backgroundColor: "#F3B141",
            color: "#000000",
            align: "center",
            padding: {
                top: 7,
                bottom: 7,
                left: 5,
                right: 5
            },
            fixedWidth: 0
        }

        //create key code for restart and main menu
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //set cave picture
        this.cave = this.add.tileSprite(0,0,640,480, "cave").setOrigin(0,0);

        //display stats, make new config settings
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 45, "GAME OVER", endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize , "You survived for: " + timeSurvived + " seconds", endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 45, "Monsters dodged: " + p1Score, endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 90, "Best Survival Time: " + topSurvive + " seconds", endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 135, "Press R to restart or M for main menu", endConfig).setOrigin(0.5);



    }

    update(){
        //update
        //check if user wants to restart
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.sound.play("sfx_select");
            this.scene.start("playScene");
            p1Score = 0;
        }
        else if (Phaser.Input.Keyboard.JustDown(keyM)){
            this.sound.play("sfx_select");
            this.scene.start("titleScene");
            p1Score = 0;
        }

        //scroll cave
        this.cave.tilePositionX += 2;
    }
}