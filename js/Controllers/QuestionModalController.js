class QuestionModalController {
    constructor() {
        this._questionModalEl = document.querySelector("#questionScreen");
        this._questionTitleEl = document.querySelector("#questionScreen > h3");
        this._questionDescriptionEl = document.querySelector("#questionScreen > p");
        this._questionImageEl = document.querySelector("#questionScreen > img");
        this._alternativeListEl = document.querySelector("#questionScreen > ul");
        this.multiplier = 1;
        this._questionNumber = 0;
    }

    showQuestionModal() {
        document.querySelector("#questionScreen").style.display = 'inline';
    }

    displayQuestion(question) {
        this._questionNumber++;
        const finalQuestionNumber = this._questionNumber < 10 ? "0" + this._questionNumber : this._questionNumber;

        this._questionTitleEl.innerHTML = `Questão ${finalQuestionNumber} (${this.multiplier}x)`;
        this._questionDescriptionEl.innerHTML = question.description;
        this._questionImageEl.src = question.imgSrcPath ? question.imgSrcPath : "";
        this._populateAlternativesList(question.alternatives, question.correctAnswerIndex);
    }

    _populateAlternativesList(alternatives, correctAnswerIndex) {
        this._alternativeListEl.innerHTML = '';
        let currentAlternativeCharacter = "A";
        
        alternatives.map((questionAlternative, alternativeIndex) => {
            const alternativeEl = document.createElement('li');

            alternativeEl.innerHTML = `${currentAlternativeCharacter}) ${questionAlternative}`;

            alternativeEl.addEventListener('click', () => {
                this._handleAnswer(alternativeIndex, correctAnswerIndex);
            })

            this._alternativeListEl.appendChild(alternativeEl);
            currentAlternativeCharacter = CharacterUtil.getNext(currentAlternativeCharacter);
        })
    }

    _handleAnswer(answerIndex, correctAnswerIndex) {
        if(this._isAnswerCorrect(answerIndex, correctAnswerIndex)) {
            this.multiplier += 0.25;
        } else {
            this.multiplier = 1;
        }
    } 

    _isAnswerCorrect = (answerIndex, correctAnswerIndex) => answerIndex == correctAnswerIndex;

}