class HybridizationQuestionType extends QuestionType {
    constructor() {
        super();
    }

    generateQuestion(molecules) {
        const choosenMolecule = molecules[RandomUtil.getRandomIntInRange(0, molecules.length - 1)],
              alternativeMolecules = super._getAlternativeMolecules(molecules, choosenMolecule, "tipoHibridizacao");

        const questionDescription = `A increditável molécula ${choosenMolecule["Nome IUPAC"]} 
            tem essa fórmula molecular aqui: ${choosenMolecule["formulaMolecular"]}. Fala que não é maneiro? 
            Bom, a partir disso dá pra saber que a hibridização dos carbonos dela é: `,
              questionAlternatives = ArrayUtil.shuffle([choosenMolecule, ...alternativeMolecules]).map(molecule => molecule.tipoHibridizacao),
              correctAnswerIndex = questionAlternatives.indexOf(choosenMolecule.tipoHibridizacao);
        
        return {
            description: questionDescription,
            alternatives: questionAlternatives,
            correctAnswerIndex: correctAnswerIndex,
            imgSrcPath: ""
        }
    }
}