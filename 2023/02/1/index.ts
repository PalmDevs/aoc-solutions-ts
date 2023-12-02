import { getInput } from '../../utils/input'
import { CubesInBag } from './constants'

const input = await getInput(true)
let sum = 0

for (const line of input.split('\n')) {
    const [prefix, setsString] = line.split(': ')
    const gameId = Number(prefix.slice(5))

    const sets = setsString.split('; ')

    let setsPossible = 0

    for (const set of sets) {
        const counter: GameCubeMap = {
            red: 0,
            green: 0,
            blue: 0,
        }

        const cubesCount = set.split(', ')
        for (const cubeCount of cubesCount) {
            const [count, color] = cubeCount.split(' ')
            counter[color as keyof GameCubeMap] += Number(count)
        }

        if (CubesInBag.red >= counter.red && CubesInBag.green >= counter.green && CubesInBag.blue >= counter.blue)
            setsPossible++
    }

    if (setsPossible === sets.length) sum += gameId
}

console.log(sum)

type GameCubeMap = {
    [K in 'red' | 'green' | 'blue']: number
}
