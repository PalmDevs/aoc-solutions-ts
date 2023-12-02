import { getInput } from '../../utils/input'

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
        const cc = str.charCodeAt(i)
        if (cc >= 48 && cc <= 57) return Number(str[i])
    }
}
