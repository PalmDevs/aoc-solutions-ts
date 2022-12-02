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

// Get answer
export function getPoints(input: DayTwoInput) {
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

export function getAnswer(input: string) {
    return getPoints(splitInput(input)
}
