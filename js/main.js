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
const playerVelocity = 160;

// Var
let game = new Phaser.Game(config);
let movController, inputController, player, resourceStands, tootipController, resourceCenterController;

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
    /** TEST CODE*/
        
    let questionController = new QuestionModalController();

    questions = [
        {
            "description": "Essa é uma questão. Se esse texto está aparecendo na tela, então nem tudo deu errado!",
            "alternatives": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
            "correctAnswerIndex": 1
        },
        {
            "description": "Essa é uma questão. Se esse texto está aparecendo na tela, então nem tudo deu errado!",
            "alternatives": ["Opção A", "Opção B", "Opção C", "Opção D"],
            "correctAnswerIndex": 2
        },
        {
            "description": "Essa é uma questão. Se esse texto está aparecendo na tela, então nem tudo deu errado!",
            "alternatives": ["Opção W", "Opção X", "Opção Y", "Opção Z"],
            "correctAnswerIndex": 0
        }
    ]

    for(let q of questions) {
            questionController.displayQuestion(q);
    }


    /**END OF TEST CODE */
    this.add.tileSprite(0, 0, 1600, 1600, 'lab-background-tile').setScale(3);

    resourceStands = this.physics.add.staticGroup();
    resourceStands.name = "resource-stand-group";

    resourceStands.create(400, 170, "reagents")
        .setScale(3).refreshBody().setSize(90, 20).setOrigin(0.5, 0.20);

    resourceStands.create(200, 200, "glassware")
        .setScale(3).refreshBody().setSize(90, 50).setOrigin(0.5, 0.30)




    player = new Player(this, 300, 200, 'cientista').setScale(3);
 
    movController = new MovementController(player, this.input.keyboard.createCursorKeys(), playerVelocity)

    resourceCenterController = new ResourceCenterController([
        new ResourceCenter('reagents'),
        new ResourceCenter('glassware'),
        new ResourceCenter('constructionmaterial')
    ], player.isCloseToElement, player);
    
    // Key events
    inputController = new InputController(this.input);
    inputController.addKeyEvent('Q', resourceCenterController.increment, 'reagents', resourceCenterController);
    inputController.addKeyEvent('W', resourceCenterController.increment, 'glassware', resourceCenterController);
    inputController.addKeyEvent('E', player.displayProximityMessage, resourceStands, player);

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