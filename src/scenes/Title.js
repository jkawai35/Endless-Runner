class Title extends Phaser.Scene{
    constructor(){
        super("titleScene")
    }

    preload(){
        //preload
    }

    create(){
        //create

        //set background
        this.cameras.main.setBackgroundColor(0xDDDDDD);

        //menu config
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "26px",
            backgroundColor: "#FFFFFF",
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 45, "Use ↑↓ to move and dodge the obstacles", menuConfig).setOrigin(0.5);

        //start key
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update(){
        //update
        //check s key
        if (Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("playScene");
        }
    }
}