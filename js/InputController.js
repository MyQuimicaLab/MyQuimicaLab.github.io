class InputController {
    constructor(sceneInput) {
        this._sceneInput = sceneInput;
        this._keyActions = [];
    }

    update() {
        for (let keyboardKey of this._keyActions) {
            if (Phaser.Input.Keyboard.JustDown(keyboardKey.key)) {
                keyboardKey.action(keyboardKey.actionArgument);
            }
        }
    }

    addKeyEvent(key, eventCallback, eventArg = undefined) {
        let tempObj = {
            key: this._sceneInput.keyboard.addKey(key),
            action: eventCallback,
            actionArgument: eventArg
        }

        this._keyActions.push(tempObj);
    }
}