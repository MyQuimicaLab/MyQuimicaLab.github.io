class InputController {
    constructor(sceneInput) {
        this._sceneInput = sceneInput;
        this._keyActions = [];
    }

    update() {
        for (let keyboardKey of this._keyActions) {
            if (Phaser.Input.Keyboard.JustDown(keyboardKey.key)) {
                let callback = keyboardKey.action.bind(keyboardKey.thisArg);
                callback(keyboardKey.actionArgument);
            }
        }
    }

    addKeyEvent(key, eventCallback, eventArg = null, thisArg = null) {
        let tempObj = {
            key: this._sceneInput.keyboard.addKey(key),
            action: eventCallback,
            actionArgument: eventArg,
            thisArg: thisArg
        }

        this._keyActions.push(tempObj);
    }
}