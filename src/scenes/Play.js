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

        this.add.rectangle(0, 0, game.config.width, 15, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - 15, game.config.width, 15, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, 0, 15, game.config.height, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - 15, 0, 15, game.config.height, 0x000000).setOrigin(0 ,0);

        //create bat
        p1bat = this.physics.add.sprite(55, game.config.height / 2, "bat").setOrigin(0.5);
        p1bat.setScale(3);
        p1bat.setCollideWorldBounds(true);
        p1bat.setImmovable();
        p1bat.body.setSize(28, 25);

        //create animations
        this.anims.create({
            key: 'fly-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'fly-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'idle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'idle-down',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'idle-up',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })



        //create cursors
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        //update
        this.cave.tilePositionX += 2;

        //create vector for bat
        let batVector = new Phaser.Math.Vector2(0,0)


        //check keyboard input
        if(cursors.up.isDown) {
            batVector.y = -1;
            batDirection = "up";
        } else if(cursors.down.isDown) {
            batVector.y = 1;
            batDirection = "down";
        }

        //update state of bat
        p1bat.setVelocity(batVelocity * batVector.x, batVelocity * batVector.y)
        batVector.length() ? batMovement = "fly" : batMovement = "idle"
        p1bat.play(batMovement + "-" + batDirection, true)
    }
}