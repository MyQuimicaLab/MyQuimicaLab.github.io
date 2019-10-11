class AnswerHandler{

    constructor(resourceController){
        this._resourceController = resourceController;

        this._resourceAmountPerAnswer = 10;
        this._resourceMultiplier = 1;
    }

    handleCorrect(resource){

        // soundFXController.play('correct-answer');
        this._resourceMultiplier += 0.25;
        this._resourceController.increment(resource, this._resourceAmountPerAnswer * this._resourceMultiplier);
        this._handle();
    }

    handleIncorrect(resource){

        // soundFXController.play('wrong-answer');
        this._resourceMultiplier = 1;
        this._handle();
    }


    get resourceMultiplier(){
        return this._resourceMultiplier;
    }
}