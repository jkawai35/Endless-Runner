class Title extends Phaser.Scene{
    constructor(){
        super("titleScene")
    }

    preload(){
        //preload
        this.load.image("cave", "./assets/cave.png");

        //load all sounds
        this.load.audio("sfx_select", "./assets/mixkit-arcade-mechanical-bling-210.wav");
        this.load.audio("sfx_back", "./assets/mixkit-arcade-retro-changing-tab-206.wav");
    }

    create(){
        //create
        //cave backgroud
        this.cave = this.add.tileSprite(0,0,640,480, "cave").setOrigin(0,0);

        //set background
        this.cameras.main.setBackgroundColor(0xDDDDDD);

        //menu config
        let menuConfig = {
            fontFamily: "fantasy",
            fontSize: "26px",
            backgroundColor: "#F3B141",
            color: "#000000",
            align: "center",
            padding: {
                top: 7,
                bottom: 7,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        }

        //in game instructions
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, "ENDLESS RUNNER", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 45, "Use ↑↓ to move and dodge the monsters!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 90, "Press S to start!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 135, "Press C for credits", menuConfig).setOrigin(0.5);


        //start key
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    }

    update(){
        //update
        //scroll cave png
        this.cave.tilePositionX += 2;

        //check s key
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        else if (Phaser.Input.Keyboard.JustDown(keyC)){
            this.sound.play("sfx_select");
            this.scene.start("creditScene");
        }
    }
}