class QuestionType {
    constructor() {}

    generateQuestion(molecules) {
        throw new Error("Error! This method can't be invoked by the base class 'Question Type'.");
    }

    _getAlternativeMolecules(molecules, mainMolecule, filterField) {
        const filteredMolecules = molecules.filter((molecule) => molecule[filterField] != mainMolecule[filterField]),
              alternativeMolecules = [];

        for(let i = 0; i < 3; i++) {
           const randomMoleculeIndex = RandomUtil.getRandomIntInRange(0, filteredMolecules.length - 1);
            alternativeMolecules.push(filteredMolecules[randomMoleculeIndex]);
        }

        return alternativeMolecules;
    }
}