class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //preload
        this.load.image("cave", "./assets/cave.png");
        this.load.spritesheet("bat", "./assets/bat.png", {frameWidth: 30, framHeight: 30});
        this.load.image("monster", "./assets/Monster.png");
        this.load.image("blood", "./assets/Blood.png");
    }

    create(){
        //create

        //timer
        this.startTime = new Date();
        this.timeElapsed;

        //monster stats
        this.monsterSpeed = -300;
        this.monsterMax = -1200;
        this.difficulty = 0;

        //create cave
        this.cave = this.add.tileSprite(0,0,640,480, "cave").setOrigin(0,0);

        //create border
        this.add.rectangle(0, 0, game.config.width, 15, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - 15, game.config.width, 15, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(0, 0, 15, game.config.height, 0x000000).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - 15, 0, 15, game.config.height, 0x000000).setOrigin(0 ,0);

        //create bat with physics
        p1bat = this.physics.add.sprite(55, game.config.height / 2, "bat").setOrigin(0.5);
        p1bat.setScale(3);
        p1bat.setCollideWorldBounds(true);
        p1bat.setImmovable();
        p1bat.body.setSize(15, 10);
        p1bat.body.setOffset(9);

        //create animations
        //flying down
        this.anims.create({
            key: 'fly-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        //flying up
        this.anims.create({
            key: 'fly-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bat", {
                start: 0,
                end: 2
            })
        })

        //idling, slower animation rate
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

        //score config
        let scoreConfig = {
            fontFamily: 'Bodoni',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //create score
        this.scoreRight = this.add.text(game.config.width - 116, 15, p1Score, scoreConfig);

        //create cursors
        cursors = this.input.keyboard.createCursorKeys();

        //create monster group
        this.monsterGroup = this.add.group({
            runChildUpdate: true
        });

        //delay time between monster spawns
        this.time.delayedCall(3000, () => {
            this.addMonster();
        })

        //change difficulty based on score
        //check delay time
        /*
        this.levelTimer = this.time.addEvent({
            delay: 500,
            callback: this.increaseSpeed,
            callbackScope: this,
            loop: true
        })
        */
       this.increaseSpeed();

    }

    update(){
        //update
        //scroll cave png
        this.cave.tilePositionX += 2;

        //create vector for bat
        let batVector = new Phaser.Math.Vector2(0,0);

        this.physics.world.collide(p1bat, this.monsterGroup, this.batCollide, null, this);

        //check if player is alive
        if(!p1bat.destroyed){
            //check keyboard input
            if(cursors.up.isDown) {
                batVector.y = -1;
                batDirection = "up";
            } else if(cursors.down.isDown) {
                batVector.y = 1;
                batDirection = "down";
            }
            //update state of bat
            p1bat.setVelocity(batVelocity * batVector.x, batVelocity * batVector.y);
            batVector.length() ? batMovement = "fly" : batMovement = "idle"
            p1bat.play(batMovement + "-" + batDirection, true);
        }

        //update score
        this.scoreRight.text = p1Score;
    }

    addMonster(){
        if (!p1bat.destroyed){
            let speedChange = Phaser.Math.Between(0, 50);
            let monster = new Monster(this, this.monsterSpeed - speedChange);
            this.monsterGroup.add(monster);
        }
    }

    batCollide(){
        p1bat.destroyed = true;
        this.cameras.main.shake(2500, 0.0075);
        let bloodManager = this.add.particles("blood");
        let bloodSplatter = bloodManager.createEmitter({
            alpha: {start: 1, end: 0},
            scale: {start: .75, end: 0},
            speed: {min: -150, max: 150},
            lifespan: 4000,
            blendMode: "ADD"
        });

        let batBounds = p1bat.getBounds();
        bloodSplatter.setEmitZone({
            source: new Phaser.Geom.Rectangle(batBounds.x, batBounds.y, batBounds.width, batBounds.height),
            type: "edge",
            quantity: 500
        });
        bloodSplatter.explode(500);

        //destroy bat
        p1bat.destroy();
        
        //calculate elasped time
        this.endTime = new Date();
        this.timeElapsed = -((this.startTime.getTime() - this.endTime.getTime()) / 1000);
        timeSurvived = Math.round(this.timeElapsed * 100) / 100;

        //allow animations to play first and then end game
        this.time.delayedCall(2500, () => {
            this.scene.start("gameOver");
        })
    }

    increaseSpeed(){
        //increase score every 10 points
        //can also check based on dificulty level
        if (p1Score % 10 == 0 && p1Score != 0){
            if (this.monsterSpeed >= this.monsterMax)
            {
                this.monsterSpeed -= 25;
            }
            console.log(`score: ${p1Score}, speed: ${this.monsterSpeed}`);
        }
        this.time.delayedCall(1000, this.increaseSpeed, null, this)
    }
}