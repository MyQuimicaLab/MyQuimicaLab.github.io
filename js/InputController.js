class InputController extends Phaser.Input.Keyboard.KeyboardPlugin {
    constructor(sceneInput) {
        super(sceneInput);
        this.keyActions = [];
    }

    update() {
        
    }

    addKeyEvent(key, eventCallback) {
        super.addKeys(key);

        let tempObj = {
            key: key,
            action: eventCallback
        }

        this.keyActions.push(tempObj);
    }
}