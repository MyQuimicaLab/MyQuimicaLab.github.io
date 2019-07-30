class InputController extends Phaser.Input.Keyboard.KeyboardPlugin {
    constructor(sceneInput) {
        super(sceneInput);
        this.keyActions = [];
    }

    update() {
        for(let key of this.keyActions) {
           if(Phaser.Input.Keyboard.JustDown(key.key)) {
                key.action();
           }
        }
    }

    addKeyEvent(key, eventCallback) {
        let tempObj = {
            key: super.addKey(key),
            action: eventCallback
        }

        this.keyActions.push(tempObj);
    }
}