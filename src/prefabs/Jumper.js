class Jumper extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, velocity){
        super(scene, game.config.width, Phaser.Math.Between(50, game.config.height - 35), "jumper");

        this.parentScene = scene;

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setVelocityY(100);
        this.setBounce(1);
        this.setImmovable();
        this.body.setSize(30, 10);
        this.body.setOffset(0, this.height / 2 - 5);
        this.setCollideWorldBounds(true);
    }

    update(){
        //destroy monster if it gets to the end of the scene
        if (this.x < game.config.width / 18){
            this.destroy();
            if (!p1bat.destroyed){
                p1Score += 1;
            }
        }
    }
}