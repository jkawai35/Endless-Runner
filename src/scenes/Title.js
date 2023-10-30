class Title extends Phaser.Scene{
    constructor(){
        super("titleScene")
    }

    preload(){
        //preload
        this.load.image("cave", "./assets/cave.png");
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
            },
            fixedWidth: 0
        }

        //in game instructions
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, "ENDLESS RUNNER", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 45, "Use ↑↓ to move and dodge the monsters!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 90, "Press S to start!", menuConfig).setOrigin(0.5);


        //start key
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update(){
        //update
        //scroll cave png
        this.cave.tilePositionX += 2;

        //check s key
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("playScene");
        }
    }
}