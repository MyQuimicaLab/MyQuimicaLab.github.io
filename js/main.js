// Phaser config
var config = {
    type: Phaser.WEBGL,
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
const PLAYER_VELOCITY = 160;
const CURRENT_BRANCH = 'question_screen';

// Var
let game = new Phaser.Game(config);
let movController, inputController, player, resourceStands, tootipController, resourceController;

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
    this.load.image('reagents', 'Assets/Objects/resource-stand-1.png');
    this.load.image('glassware', 'Assets/Objects/resource-stand-2.png');
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

    resourceStands.create(400, 170, "reagents")
        .setScale(3).refreshBody().setSize(90, 20).setOrigin(0.5, 0.20);

    resourceStands.create(200, 200, "glassware")
        .setScale(3).refreshBody().setSize(90, 50).setOrigin(0.5, 0.30)

    player = new Player(this, 300, 200, 'cientista').setScale(3);
 
    movController = new MovementController(player, this.input.keyboard.createCursorKeys(), PLAYER_VELOCITY)

    resourceController = new ResourceController([
        new ResourceCenter('reagents'),
        new ResourceCenter('glassware'),
        new ResourceCenter('constructionmaterial')
    ], player.isCloseToGroup, resourceStands, player);

    let questionController = new QuestionController(CURRENT_BRANCH);
    
    // Key events
    inputController = new InputController(this.input);
    inputController.addKeyEvent('Q', resourceController.increment, 'reagents', resourceController);
    inputController.addKeyEvent('W', resourceController.increment, 'glassware', resourceController);
    inputController.addKeyEvent('E', questionController.presentNewQuestion, null, questionController);

    // Tooltip events
    tootipController = new TooltipController(this, player, player.isCloseToGroup);
    tootipController.addTooltipEvent('interact-tooltip', resourceStands)
    
    // Collider
    this.physics.add.collider(resourceStands, player);

    this.children.bringToTop(player);
}

function update() {
    //resourceCenterController.increment('reagents', 1);
    //resourceCenterController.increment('glASSwAre', '2');
    //resourceCenterController.increment('constructionMATERIAL', 3);
    movController.update();
    inputController.update();
    tootipController.update();
}