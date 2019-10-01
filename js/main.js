// Phaser config
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    canvas: document.querySelector('canvas'),
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
let movController, inputController, player, resourceStands, tootipController;

function preload() {
    let browserSupportCheck = new BrowserSupportController(this.sys.game.device).checkCompatibility();

    if(!browserSupportCheck.support) {
        alert('Ops! Parece que o seu dispositivo ainda não possui suporte às seguintes tecnologias: \n'
        + browserSupportCheck.notSupportedFeatures);

        if(browserSupportCheck.notSupportedFeatures.includes('canvas')) {
            window.location.replace('browser_doesnt_support.html');
        }
    }

    this.load.image('lab-background-tile', 'Assets/Objects/lab-background-tile.png');
    this.load.image('resource-stand-1', 'Assets/Objects/resource-stand-1.png');
    this.load.image('resource-stand-2', 'Assets/Objects/resource-stand-2.png');
    this.load.spritesheet('cientista', 
        'Assets/Characters/cientista-1.png',
        { frameWidth: 16, frameHeight: 20 }
    );

    this.load.image('interact-tooltip', 'Assets/Tooltips/interact-tooltip.png');

}

function create() {
    this.add.tileSprite(0, 0, 1600, 1600, 'lab-background-tile').setScale(3);

    resourceStands = this.physics.add.staticGroup();
    resourceStands.name = "resource-stand-group";

    resourceStands.create(400, 170, "resource-stand-1")
        .setScale(3).refreshBody().setSize(90, 20).setOrigin(0.5, 0.20);

    resourceStands.create(200, 200, "resource-stand-2")
        .setScale(3).refreshBody().setSize(90, 50).setOrigin(0.5, 0.30)



    player = new Player(this, 300, 200, 'cientista').setScale(3);
 
    movController = new MovementController(player, this.input.keyboard.createCursorKeys(), playerVelocity)

    inputController = new InputController(this.input);

    inputController.addKeyEvent('E', player.displayProximityMessage, resourceStands, player);
    this.children.bringToTop(player);

    tootipController = new TooltipController(this, player, player.isCloseToGroup);
    tootipController.addTooltipEvent('interact-tooltip', resourceStands)
    
    // Collider
    this.physics.add.collider(resourceStands, player);

    
}

function update() {
    movController.update();
    inputController.update();
    tootipController.update();
}