class Monster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width, Phaser.Math.Between(100, game.config.height - 100), "monster");

        this.parentScene = scene;

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.setCircle(this.width / 2)
        this.setOffset(this.width / 20)
        this.newMonster = true;


    }

    update(){
        //create new barrier when previous one passes certain x value
        if(this.newMonster && this.x < game.config.width / 2){
            this.parentScene.addMonster(this.parent, this.velocity);
            this.newMonster = false;
        }

        //destroy monster if it gets to the end of the scene
        if (this.x < game.config.width / 10){
            this.destroy();
            p1Score += 1;
        }

    }
}