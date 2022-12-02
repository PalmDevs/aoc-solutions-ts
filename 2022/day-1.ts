import fs from 'node:fs'

// Converts input to number[] (array of each elf's calories)
export function getEachElfsCalories(input: string): number[] {
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

const calories = getEachElfsCalories(
    fs.readFileSync('input-day-1.txt').toString()
)

// answers[0] for first part
// answers[1] for second part
export const answers: [number, number] = [
    calories[0],
    [0, 1, 2]
        .map(index => calories[index])
        .reduce((prev, acc) => prev + acc)
]
