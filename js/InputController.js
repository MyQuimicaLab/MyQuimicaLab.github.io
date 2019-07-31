class InputController {
    constructor(sceneInput) {
        this._sceneInput = sceneInput;
        this._keyActions = [];
    }

    update() {
        for(let key of this._keyActions) {

           if(Phaser.Input.Keyboard.JustDown(key.key)) {
                key.action();
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