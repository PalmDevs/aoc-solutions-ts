// Converts input to number[] (array of each elf's calories)
export function getEachCaloriesAmount(input: string): number[] {
    return input
        .trim()
        .split('\n\n')
        .map(calories => calories.split('\n'))
        .map(array => array.reduce<number>(
                (acc, cur) => Number(acc) + Number(cur),
                0
            )
        )
        .sort((a, b) => b - a)
}


export function getAnswer(input: string) {
    const calories = getEachCaloriesAmount(input)

    return [0, 1, 2]
        .map(index => calories[index])
        .reduce((prev, acc) => prev + acc)
}
