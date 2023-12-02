import { getInput } from '../../utils/input'

const input = await getInput(true)
let sum = 0

for (const line of input.split('\n')) {
    const [, setsString] = line.split(': ')
    const cubeCounts = setsString.split(/[,;] /)
    const lowestCounter: GameCubeMap = {
        red: 0,
        green: 0,
        blue: 0,
    }

    for (const cubeCount of cubeCounts) {
        const [count, color] = cubeCount.split(' ')
        const actualCount = Number(count)
        if (lowestCounter[color] < actualCount) lowestCounter[color] = actualCount
    }

    sum += lowestCounter.red * lowestCounter.green * lowestCounter.blue
}

console.log(sum)

type GameCubeMap = {
    [K in 'red' | 'green' | 'blue']: number
}
