// Phaser config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
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
let movController, inputController, player;

let physics;

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
    //Not proud of this. This will be deleted soon, at least.
    physics = this.physics;

    // Background
    this.add.tileSprite(0, 0, 1600, 1600, 'lab-background-tile').setScale(3);

    // Player
    //player = this.physics.add.sprite(300, 200, 'cientista').setScale(3);
    player = new Player(this, 300, 200, 'cientista').setScale(3);
        // Movement Controller
    movController = new MovementController(player, this.input.keyboard.createCursorKeys(), playerVelocity)
        // Input Controller
    inputController = new InputController(this.input);

    // Resource Stands
    let resourceCenters = this.physics.add.staticGroup();
    resourceCenters.name = "resourceCenters";
    resourceCenters.create(300, 100, "resource-stand-1").setScale(3).refreshBody();
    resourceCenters.create(100, 100, "resource-stand-2").setScale(3).refreshBody();
    inputController.addKeyEvent('E', isCloseToGroup, resourceCenters);

    // Collider
    this.physics.add.collider(resourceCenters, player);
}

function update() {
    movController.update();
    inputController.update();
        
}

/*This function will be replaced in the 'Player' class when it's done.
This is just for test purposes.

OBS: The 'physics' variable also will be reachable through the Player class.
Again, it exists JUST FOR TESTS.*/
function isCloseToGroup(group) {
    let responses = new Map([
        ['resource-stand-1', 'Centro de recursos 1!'],
        ['resource-stand-2', 'Centro de recursos 2!']
    ]);

    let closeObjects = physics.overlapRect(player.x - player.width, player.y - player.height, 200, 200, false, true);
    
    let nearestResourceCenter = closeObjects.filter(object => group.getChildren().includes(object.gameObject))[0];
    
    if(nearestResourceCenter) {
        console.log(responses.get(nearestResourceCenter.gameObject.texture.key));
    }
}