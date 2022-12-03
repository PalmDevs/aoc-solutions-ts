export enum PossibleElfChoices {
    A,
    B,
    C
}

export enum PossibleChoices {
    X,
    Y,
    Z
}

// Points for each round results
export const ResultPoints = {
    Win: 6,
    Draw: 3,
    Lose: 0
} as const

export type DayTwoInput = Array<[
    keyof typeof PossibleElfChoices,
    keyof typeof PossibleChoices
]>


// Splits input to Array<[ elfChoice, choice ]> as DayTwoInput
export function splitInput(input: string) {
    return input
        .split('\n')
        .map(line => line.split(' ')) as DayTwoInput
}

// Determines the result points of the choices when played
export function determineResultPoints(
    elfChoice: DayTwoInput[number][0],
    ourChoice: DayTwoInput[number][1]
) {
    const elfChoiceIndex: 0 | 1 | 2 = PossibleElfChoices[elfChoice]
    const choiceIndex: 0 | 1 | 2 = PossibleChoices[ourChoice]

    if (elfChoiceIndex === choiceIndex) return ResultPoints.Draw

    // Choices are ordered by Rock, Paper, and Scissors
    // Winning choices will always have another losing choice in between each other
    // Therefore, (indexof(elfChoice) + 1) % 3 will always be the winning choice
    if (((elfChoiceIndex + 1) % 3) === choiceIndex) return ResultPoints.Win

    return ResultPoints.Lose
}


// Get answer
export function getPoints(input: DayTwoInput) {
    return input
        .map(
            ([ elfChoice, ourChoice ]) =>
            (PossibleChoices[ourChoice] + 1) + determineResultPoints(elfChoice, ourChoice)
        )
        .reduce((acc, cur) => acc + cur)
}


/* 
    Example input (A = X = Rock, B = Y = Paper, C = Z = Scissors):

    A X
    A Y
    A Z
    B X
    B Y
    B Z
    C X
    C Y
    C Z
*/

export function getAnswer(input: string) {
    return getPoints(splitInput(input))
}
