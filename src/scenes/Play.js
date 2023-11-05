class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }

    preload(){
        //preload
        //load images and sprites
        this.load.image("cave", "./assets/cave.png");
        this.load.spritesheet("bat", "./assets/bat.png", {frameWidth: 30, framHeight: 30});
        this.load.image("monster", "./assets/Monster.png");
        this.load.image("blood", "./assets/Blood.png");
        this.load.image("jumper", "./assets/jumper.png");

        //load sounds
        this.load.audio("sfx_woosh", "./assets/mixkit-arrow-whoosh-1491.wav");
        this.load.audio("sfx_game_over", "./assets/mixkit-falling-game-over-1942.wav");
        this.load.audio("spooky", "./assets/spooky.wav");
    }

    create(){
        //create

        difficulty = 0;

        //add looping music
        this.music = this.sound.add("spooky", {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true,
        });
        this.music.play();

        //timer
        this.startTime = new Date();
        this.timeElapsed;

        //keycode
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //monster stats
        this.monsterSpeed = -300;
        this.monsterMax = -1200;

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

        this.jumperChoice = this.time.addEvent({
            delay: 1000,
            callback: this.jumperChance,
            callbackScope: this,
            loop: true
        });

        //create score
        this.scoreRight = this.add.text(game.config.width - 116, 15, p1Score, scoreConfig);

        //create cursors
        cursors = this.input.keyboard.createCursorKeys();

        //create monster group
        this.monsterGroup = this.add.group({
            runChildUpdate: true
        });

        this.jumperGroup = this.add.group({
            runChildUpdate: true
        });

        //delay time between monster spawns
        this.time.delayedCall(3000, () => {
            this.addMonster();
        })

        //change difficulty based on score
       this.increaseSpeed();

    }

    update(){
        //update
        //scroll cave png
        this.cave.tilePositionX += 2;

        //create vector for bat
        let batVector = new Phaser.Math.Vector2(0,0);

        this.physics.world.collide(p1bat, this.monsterGroup, this.batCollide, null, this);
        this.physics.world.collide(p1bat, this.jumperGroup, this.jumperCollide, null, this);

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

            //play sound
            if (Phaser.Input.Keyboard.JustDown(keyUP)){
                this.sound.play("sfx_woosh");
            }
            else if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
                this.sound.play("sfx_woosh");
            }
        }

        //update score
        this.scoreRight.text = p1Score;
    }

    addMonster(){
        //make new monsters add to group if bat is alive
        if (!p1bat.destroyed){
            let speedChange = Phaser.Math.Between(0, 50);
            let monster = new Monster(this, this.monsterSpeed - speedChange);
            this.monsterGroup.add(monster);
        }
    }

    addJumper(){
        //make new jumpers add to group if bat is alive
        if (!p1bat.destroyed){
            let jumper = new Jumper(this, -100);
            this.jumperGroup.add(jumper);
        }
    }

    batCollide(){
        p1bat.destroyed = true;
        this.cameras.main.shake(2500, 0.0075);
        this.sound.play("sfx_game_over");

        //audio change
        this.tweens.add({
            targets: this.music,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
            rate: 0.5,
        });

        //create explosion
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
            if (this.timeElapsed > topSurvive){
                topSurvive = Math.round(this.timeElapsed * 100) / 100;
            }
            this.scene.start("gameOver");
        })
    }

    jumperCollide(){
        p1bat.destroyed = true;
        this.cameras.main.shake(2500, 0.0075);
        this.sound.play("sfx_game_over");

        //audio change
        this.tweens.add({
            targets: this.music,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
            rate: 0.5,
        });

        //create explosion
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
            if (this.timeElapsed > topSurvive){
                topSurvive = Math.round(this.timeElapsed * 100) / 100;
            }
            this.scene.start("gameOver");
        })
    }

    increaseSpeed(){
        //increase score every 10 points
        this.monsterSpeed = -(300 + Math.floor(p1Score / 10) * 25)

        //call itself every second and check score
        this.time.delayedCall(1000, this.increaseSpeed, null, this)
    }

    jumperChance(){
        //update difficulty
        difficulty += 1;
        
        //generate random number to see if jumper will spawn
        this.roll = Phaser.Math.Between(chance,10);
        this.count = 0;

        //check if rng produced a 10 and difficulty is divisible by 5
        if (this.roll == 10 && difficulty % 5 == 0 && this.count == 0)
        {
            this.addJumper();
            this.count += 1;
        }   
        if (difficulty % 20 == 0 && difficulty != 0){
            //increase chance of spawning jumper
            if (chance < 10){
                chance += 1;
            }
        }     
    }
}