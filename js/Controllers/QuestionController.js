class QuestionController{

    constructor(repoBranch = 'master', resourceController) {
        this._repoBranch = repoBranch;
        this._resourceController = resourceController;
        this._answerHandler = new AnswerHandler(resourceController);
    }

    presentNewQuestion(){

        if (this._moleculeArrayCache ==! undefined)
            this._generateQuestion(moleculeArray);

        else {

            let moleculesPromise = this._getMolecules();
            moleculesPromise.then(moleculeArray => {

                this._moleculeArrayCache = moleculeArray;
                this._generateQuestion(moleculeArray);
            })
        }
    }

    _generateQuestion(moleculeArray){

        let modalController = new QuestionModalController(this._answerHandler);
    
        let question = this._chooseQuestionType();

        modalController.displayQuestion(question.generateQuestion(moleculeArray));
        modalController.showQuestionModal();
    }

    async _getMolecules(){

        let localSource = '../../Assets/molecule-database.json';
        let remoteSource = `https://raw.githubusercontent.com/MyQuimicaLab/MyQuimicaLab.github.io/${this._repoBranch}/Assets/molecule-database.json`;
        
        let jproxy = new JSONProxy();
    
        let result = await jproxy.getJSON(localSource);

        return result === undefined ? await jproxy.getJSON(remoteSource) : await result;
    }

    _chooseQuestionType(){

        let min = 0, max = 2;

        switch (Math.floor(Math.random() * (max - min + 1) ) + min) {
           case 0:
                return new FunctionalGroupQuestionType();
            case 1:
                return new HybridizationQuestionType();
            case 2:
                return new NomenclatureQuestionType();
        
            default:
                return new NomenclatureQuestionType();
        }
    }
}