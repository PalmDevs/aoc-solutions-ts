export const PossibleElfChoices = ['A', 'B', 'C'] as const
export const PossibleChoices = ['X', 'Y', 'Z'] as const

// Points for each shapes played
export const ShapePoints = {
    X: 1,
    Y: 2,
    Z: 3
} as const

// Points for each round results
export const ResultPoints = {
    Win: 6,
    Draw: 3,
    Lose: 0
} as const

export type DayTwoInput = Array<[
    (typeof PossibleElfChoices)[number],
    (typeof PossibleChoices)[number]
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
    const elfChoiceIndex = PossibleElfChoices.findIndex(
        choice => choice === elfChoice
    )
    const choiceIndex = PossibleChoices.findIndex(
        choice => choice === ourChoice
    )

    if (elfChoiceIndex === choiceIndex) return ResultPoints.Draw

    // Choices are ordered by Rock, Paper, and Scissors
    // Winning choices will always have another losing choice in between each other
    // Therefore, (indexof(elfChoice) + 1) % 3 will always be the winning choice
    if (((elfChoiceIndex + 1) % 3) === choiceIndex) return ResultPoints.Win

    return ResultPoints.Lose
}


// Get part one answer
export function getPartOnePoints(input: DayTwoInput) {
    return input
        .map(
            ([ elfChoice, ourChoice ]) =>
            ShapePoints[ourChoice] + determineResultPoints(elfChoice, ourChoice)
        )
        .reduce((acc, cur) => acc + cur)
}

// Get part two answer
export function getPartTwoPoints(input: DayTwoInput) {
    return input
        .map(
            ([ elfChoice, condition ]) => {
                // X is lose, Y is draw, Z is win
                const elfChoiceIndex = PossibleElfChoices.findIndex(choice => choice === elfChoice)

                const resultPoints = ResultPoints[
                    condition === 'X' ? 'Lose' :
                    condition === 'Y' ? 'Draw' : 'Win'
                ]

                const ourChoicePoints = ShapePoints[
                    PossibleChoices.at((elfChoiceIndex + (
                        condition === 'X' ? -1 :
                        condition === 'Y' ?  0 : 1
                    )) % 3)!
                ]

                return ourChoicePoints + resultPoints
            }
        )
        .reduce((acc, cur) => acc + cur)
}


/* 
    Example input:

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

// answers[0] for first part
// answers[1] for second part
export function getAnswer(input: string) {
    const arrayInput = splitInput(input)

    return [
        getPartOnePoints(arrayInput),
        getPartTwoPoints(arrayInput)
    ]
}
