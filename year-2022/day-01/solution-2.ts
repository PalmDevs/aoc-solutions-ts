// Converts input to number[] (array of each elf's calories)
export function getEachCaloriesAmount(input: string): number[] {
    return input
        .split('\n\n')
        .map(calories => calories.split('\n'))
        .map(array => array.reduce<number>(
                (acc, cur) => Number(acc) + Number(cur),
                0
            )
        )
        .sort((a, b) => b - a)
}


/*
    Example input (numbers line by line, add an empty line to insert a new calorie count):

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
    const calories = getEachCaloriesAmount(input)

    return [0, 1, 2]
        .map(index => calories[index])
        .reduce((prev, acc) => prev + acc)
}
