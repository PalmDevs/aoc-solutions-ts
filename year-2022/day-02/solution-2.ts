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
    Extract<keyof typeof PossibleElfChoices, string>,
    Extract<keyof typeof PossibleChoices, string>
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
                const elfChoiceIndex = PossibleElfChoices[elfChoice]

                const resultPoints = ResultPoints[
                    condition === 'X' ? 'Lose' :
                    condition === 'Y' ? 'Draw' : 'Win'
                ]

                // Our determined index will depend on elf's choice
                // Since indexes are ordered by Rock, Paper, Scissors
                // We can use math to get the choice we need to pick by condition

                // If we need to lose, pick the choice that comes before. Elfs picks Paper, we pick Rock
                // If we need to win, pick the choice that comes after. Elf picks Rock, we pick Paper
                // If we need to tie, pick the same index

                // Now we modulo by 3 to keep the index between 0 and 2
                // We add 1 to the number for score because the score will always be index + 1

                // What if the elf's choice index is 0? Tjat means we get a -1 and we can't add the points correctly
                // We add 3 to it to fix that issue, so it will always be higher than 0

                const ourChoicePoints = ((elfChoiceIndex + (
                    condition === 'X' ? -1 :
                    condition === 'Y' ?  0 : 1
                ) + 3) % 3) + 1

                return ourChoicePoints + resultPoints
            }
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
