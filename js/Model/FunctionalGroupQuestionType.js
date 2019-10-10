class FunctionalGroupQuestionType extends QuestionType {
    constructor() {};

    generateQuestion(molecules) {
        const choosenMolecule = molecules[RandomUtil.getRandomIntInRange(0, molecules.length - 1)],
              alternativeMolecules = super._getAlternativeMolecules(molecules, choosenMolecule, "grupoFuncional");

        const questionTitle = `O extraordinário ${choosenMolecule["Nome IUPAC"]} é frequentemente
              ${choosenMolecule["aplicacaoPratica"]}, não é incrível?! Pode-se concluir que a função orgânica
              presente nesse composto é: `,
              questionAlternatives = ArrayUtil.shuffle([choosenMolecule, ...alternativeMolecules]),
              correctAnswerIndex = questionAlternatives.indexOf(choosenMolecule);
        
        return {
            questionTitle: questionTitle,
            alternatives: questionAlternatives,
            correctAnswerIndex: correctAnswerIndex,
            srcImgPath: ""
        }
    }
}