class QuestionController{

    constructor(repoBranch = 'master') {
        this._repoBranch = repoBranch;
    }

    presentNewQuestion(){

        let molecules = this._getMolecules();
        let modalController = new QuestionModalController();

        let question = this._chooseQuestionType();
        modalController.displayQuestion(question.generateQuestion(molecules));
        modalController.showQuestionModal();
    }

    async _getMolecules(){

        let localSource = '../../Assets/question-database.json';
        let remoteSource = `https://raw.githubusercontent.com/MyQuimicaLab/MyQuimicaLab.github.io/${this._repoBranch}/Assets/question-database.json`;
        
        let jproxy = new JSONProxy();
    
        let result = await jproxy.getJSON(localSource);
        return result === undefined ? await jproxy.getJSON(remoteSource) : await result;
    }

    _chooseQuestionType(){

        let min = 0, max = 2;

        Math.floor(Math.random() * (max - min + 1) ) + min;
        
        switch (Math.floor(Math.random() * (max - min + 1) ) + min) {
            case 0:
                return new FunctionalGroupQuestionType();
            case 1:
                return new FunctionalGroupQuestionType();
            case 2:
                return new FunctionalGroupQuestionType();
        
            default:
                return new FunctionalGroupQuestionType();
        }
    }
}