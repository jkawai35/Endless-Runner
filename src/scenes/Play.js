class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //preload
        this.load.image("cave", "./assets/cave.png");
        this.load.spritesheet("bat", "./assets/bat.png", {frameWidth: 30, framHeight: 30});

    }

    create(){
        //create
        //create cave
        this.cave = this.add.tileSprite(0,0,640,480, "cave").setOrigin(0,0);

        //create bat
        //this.p1bat = this.physics.add.sprite(30, game.config.height / 2, "bat", 1);
        /*
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(30,30);
        */
    }

    update(){
        //update
        this.cave.tilePositionX += 2;
    }
}