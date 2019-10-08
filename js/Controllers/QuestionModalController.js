class QuestionModalController {
    constructor() {
        this._questionTitleEl = document.querySelector("#questionScreen > h3");
        this._questionDescriptionEl = document.querySelector("#questionScreen > p");
        this._questionImageEl = document.querySelector("#questionScreen > img");
        this._alternativeListEl = document.querySelector("#questionScreen > ul");
        this.multiplier = 1;
    }

    displayQuestion(question) {
        this._questionTitleEl.innerHTML = `Questão X (${this.multiplier}x)`;
        this._questionDescriptionEl.innerHTML = question.description;
        this._questionImageEl.src = question.imgSrcPath ? question.imgSrcPath : "";
        this.populateAlternativesList(question.alternatives);
       
    }

    populateAlternativesList(alternatives) {
        let currentAlternativeCharacter = "a";
        
        for(let questionAlternative of alternatives) {
            const alternativeEl = document.createElement('li');

            alternativeEl.innerHTML = `${currentAlternativeCharacter.toUpperCase()}) ${questionAlternative}`;

            this._alternativeListEl.appendChild(alternativeEl);
            currentAlternativeCharacter = CharacterUtil.getNext(currentAlternativeCharacter);
        }
    }


}