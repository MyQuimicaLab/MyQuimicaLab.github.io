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
let movManager, inputManager, player;

function preload() {

    this.load.image('lab-background-tile', 'Assets/Objects/lab-background-tile.png');
    this.load.image('resource-stand-1', 'Assets/Objects/resource-stand-1.png');
    this.load.image('resource-stand-2', 'Assets/Objects/resource-stand-2.png');
    this.load.spritesheet('cientista', 
        'Assets/Characters/cientista-1.png',
        { frameWidth: 16, frameHeight: 20 }
    );

}

function create() {

    // Background
    this.add.tileSprite(0, 0, 1600, 1600, 'lab-background-tile').setScale(3);

    // Player
    player = this.physics.add.sprite(300, 200, 'cientista').setScale(3);
    movManager = new MovementController(player, this.input.keyboard.createCursorKeys(), playerVelocity)
    setPlayerAnimations();

    // Resource Stands
    let resourceCenters = this.physics.add.staticGroup();
    resourceCenters.create(300, 100, "resource-stand-1").setScale(3).refreshBody();
    resourceCenters.create(100, 100, "resource-stand-2").setScale(3).refreshBody();

    // Collider
    this.physics.add.collider(resourceCenters, player);

    inputManager = new InputController(this.input);

    inputManager.addKeyEvent('E', () => console.log('An action was performed!'));

}

function update() {
    inputManager.update();
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
        frameRate: 5
    });

    game.anims.create({
        key: 'moving-left',
        frames: [ { key: 'cientista', frame: 5 }, { key: 'cientista', frame: 6 } ],
        frameRate: 5
    });

    game.anims.create({
        key: 'moving-front',
        frames: [ { key: 'cientista', frame: 0 }, { key: 'cientista', frame: 3 } ],
        frameRate: 5
    });

    game.anims.create({
        key: 'moving-back',
        frames: [ { key: 'cientista', frame: 1 }, { key: 'cientista', frame: 4 } ],
        frameRate: 5
    });

    game.anims.create({
        key: 'moving-right',
        frames: [{ key: 'cientista', frame: 5 }, { key: 'cientista', frame: 6 } ],
        frameRate: 5
    });
}