class InputController {
    constructor(sceneInput) {
        this._sceneInput = sceneInput;
        this._keyActions = [];
    }

    update() {
        for (let keyboardKey of this._keyActions) {
            if (Phaser.Input.Keyboard.JustDown(keyboardKey.key)) {
                keyboardKey.action();
            }
        }
    }

    addKeyEvent(key, eventCallback) {
        let tempObj = {
            key: this._sceneInput.keyboard.addKey(key),
            action: eventCallback
        }

        this._keyActions.push(tempObj);
    }
}