var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true
};

var game = new Phaser.Game(config);

function preload() {

    this.load.spritesheet('cientista', 
        'assets/Characters/cientista-1.png',
        { frameWidth: 16, frameHeight: 20 }
    );

}

function create() {

    let player = this.physics.add.sprite(50, 50, 'cientista').setScale(3);
}

function update() {

}