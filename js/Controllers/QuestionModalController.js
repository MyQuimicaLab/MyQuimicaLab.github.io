class QuestionModalController {
    constructor(answerHandler) {
        this._questionModalEl = document.querySelector("#questionScreen");
        this._questionTitleEl = document.querySelector("#questionScreen > h3");
        this._questionDescriptionEl = document.querySelector("#questionScreen > p");
        this._questionImageEl = document.querySelector("#questionScreen > img");
        this._alternativeListEl = document.querySelector("#questionScreen > ul");
        this._answerHandler = answerHandler;
        this._questionNumber = 1;
    }

    showQuestionModal() {
        document.querySelector("#questionScreen").style.display = 'inline';
    }

    displayQuestion(question) {
        const finalQuestionNumber = this._questionNumber < 10 ? "0" + this._questionNumber : this._questionNumber,
              resourceMultiplier = this._answerHandler.resourceMultiplier;

        this._questionTitleEl.innerHTML = `Questão ${finalQuestionNumber} (${resourceMultiplier}x)`;
        this._questionDescriptionEl.innerHTML = question.description;
        this._questionImageEl.src = question.imgSrcPath ? question.imgSrcPath : "";
        this._populateAlternativesList(question.alternatives, question.correctAnswerIndex);

        this._questionNumber++;
    }

    _populateAlternativesList(alternatives, correctAnswerIndex) {
        this._alternativeListEl.innerHTML = '';
        let currentAlternativeCharacter = "A";
        
        alternatives.map((questionAlternative, alternativeIndex) => {
            const alternativeEl = document.createElement('li');

            alternativeEl.innerHTML = `${currentAlternativeCharacter}) ${questionAlternative}`;

            alternativeEl.addEventListener('click', () => {
                this._answerHandler.handleAnswer(alternativeIndex, correctAnswerIndex);
                const isAnswerCorrect = this._answerHandler.isAnswerCorrect();
                this._highlightAnswers(alternativeIndex, correctAnswerIndex);
                alert('RESPOSTA CORRETA? ' + isAnswerCorrect); 
            })

            this._alternativeListEl.appendChild(alternativeEl);
            currentAlternativeCharacter = CharacterUtil.getNext(currentAlternativeCharacter);
        })
    }

    _highlightAnswers(attemptIndex, correctAnswerIndex) {
        const correctListItem = this._alternativeListEl.children[correctAnswerIndex];

        if(attemptIndex !== correctAnswerIndex) {
            const attemptListItem = this._alternativeListEl.children[attemptIndex];

            attemptListItem.style.backgroundColor = '#A81826';
        }

        correctListItem.style.backgroundColor = '#0DA400';
    }

}