class Title extends Phaser.Scene{
    constructor(){
        super("titleScene")
    }

    preload(){
        //preload
    }

    create(){
        //create
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, "ENDLESS DRAWER", menuConfig).setOrigin(0.5);
    }

    update(){
        //update
    }
}