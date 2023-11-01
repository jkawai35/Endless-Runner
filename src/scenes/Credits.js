class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene")
    }

    preload(){
        //preload
    }

    create(){
        //create

        //set background
        this.cameras.main.setBackgroundColor(0x200658);

        //menu config
        let credConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 45, "ENDLESS RUNNER - Credits", credConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, "Visual Assets: Jaren Kawai", credConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 45, "Audio SFX: ", credConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 90, "Music: Jaren Kawai", credConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize + 135, "Press ESC to return to main menu", credConfig).setOrigin(0.5);


        //start key
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update(){
        //update
        //check esc key
        if (Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start("titleScene");
        }
    }
}