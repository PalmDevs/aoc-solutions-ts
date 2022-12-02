// Converts input to number[] (array of each elf's calories)
export function getEachCaloriesAmount(input: string): number[] {
    return input
        .split('\n\n')
        .map(calories => calories.split('\n'))
        .map(array => array.reduce<number>(
                (prev, acc) => Number(prev) + Number(acc),
                0
            )
        )
        .sort((a, b) => b - a)
}


/*
    Example input:

    1234
    5678
    9012

    3456
    7890

    6969
    1645
    9583
    5938
*/

export function getAnswer(input: string) {
    return getEachCaloriesAmount(input)[0]
}
