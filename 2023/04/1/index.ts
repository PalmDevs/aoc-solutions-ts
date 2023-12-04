import { getInput } from '../../utils/input'

const input = await getInput()
const lines = input.split('\n')

const sum = lines
    .map(line => {
        const [, cards] = line.split(': ')
        const [winningInts, ownedInts] = cards.split('|').map(
            s =>
                new Set(
                    s
                        .trim()
                        .split(/ {1,2}/)
                        .map(Number),
                ),
        )

        let count = 0
        for (const int of ownedInts) {
            if (winningInts.has(int)) count++
        }

        return count
    })
    .reduce((pv, cv) => {
        return pv + (cv < 1 ? 0 : 2 ** (cv - 1))
    }, 0)

console.log(sum)
