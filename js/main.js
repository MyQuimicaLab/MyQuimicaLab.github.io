// Phaser config
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

// Const
const playerVelocity = 160;

// Var
let game = new Phaser.Game(config);
let movManager, player;

function preload() {

    this.load.spritesheet('cientista', 
        'assets/Characters/cientista-1.png',
        { frameWidth: 16, frameHeight: 20 }
    );

}

function create() {

    player = this.physics.add.sprite(50, 50, 'cientista').setScale(3);
    movManager = new MovementController(player, this.input.keyboard.createCursorKeys(), playerVelocity)
    setPlayerAnimations();

}

function update() {

    movManager.update();

}

function setPlayerAnimations(){

    game.anims.create({
        key: 'left',
        frames: [ { key: 'cientista', frame: 2 } ],
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'front',
        frames: [ { key: 'cientista', frame: 0 } ],
        frameRate: 10
    });

    game.anims.create({
        key: 'back',
        frames: [ { key: 'cientista', frame: 1 } ],
        frameRate: 10
    });

    game.anims.create({
        key: 'right',
        frames: [{ key: 'cientista', frame: 2 } ],
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'moving-left',
        frames: [ { key: 'cientista', frame: 5 }, { key: 'cientista', frame: 6 } ],
        frameRate: 10
    });

    game.anims.create({
        key: 'moving-front',
        frames: [ { key: 'cientista', frame: 0 }, { key: 'cientista', frame: 3 } ],
        frameRate: 10
    });

    game.anims.create({
        key: 'moving-back',
        frames: [ { key: 'cientista', frame: 1 }, { key: 'cientista', frame: 4 } ],
        frameRate: 10
    });

    game.anims.create({
        key: 'moving-right',
        frames: [{ key: 'cientista', frame: 5 }, { key: 'cientista', frame: 6 } ],
        frameRate: 10
    });
}