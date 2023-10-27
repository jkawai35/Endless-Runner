class Rock extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add to existing scene
        scene.add.existing(this);
        this.moveSpeed = 3;
    }

    update(){
        if(keyUP.isDown && this.y >= 0){
            this.y -= this.moveSpeed;
        } else if (keyDOWN.isDown && this.y <= game.config.height - this.height){
            this.y += this.moveSpeed;
        }
    }
}