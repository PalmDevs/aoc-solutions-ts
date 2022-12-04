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


export function getAnswer(input: string) {
    return getEachCaloriesAmount(input)[0]
}
