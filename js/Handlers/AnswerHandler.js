class AnswerHandler{

    constructor(questionController, resourceController){

        this._questionController = questionController;
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

    _handle(){
        
        this._questionController.presentNewQuestion();
    }

    get resourceMultiplier(){
        return this._resourceMultiplier;
    }
}