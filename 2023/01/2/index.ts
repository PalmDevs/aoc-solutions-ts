import { getInput } from '../../utils/input'
import { WordMap } from './constants'

const input = await getInput()
const lines = input.split('\n')

const answer = lines
    .map(line => {
        const x = findInteger(line, 0)
        const y = findInteger(line, line.length - 1, true)

        return Number(`${x}${y}`)
    })
    .reduce((pv, cv) => cv + pv, 0)

console.log(answer)

function findInteger(str: string, startIndex: number, reverse = false) {
    for (let i = startIndex; i >= 0 && i <= str.length; i += reverse ? -1 : 1) {
        for (let j = 0; j < WordMap.length; j++) {
            const word = WordMap[j]
            const firstWordIndex = reverse ? -1 : 0

            if (word.at(firstWordIndex) !== str[i]) continue

            const sliceParams = reverse ? [i - word.length + 1, i + 1] : [i, i + word.length]
            if (word === str.slice(...sliceParams)) return j + 1
        }

        const cc = str.charCodeAt(i)
        if (cc >= 48 && cc <= 57) return Number(str[i])
    }
}
