import { getInput } from '../../utils/input'

const input = await getInput(true)
const lines = input.split('\n').map(x => x.split(''))
const positionToFindSymbols = getIntegerHitboxRangesPerLine(input.split('\n'))

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const affectedColumnsRanges = positionToFindSymbols[i]
    for (let j = 0; j < affectedColumnsRanges.length; j++) {
        const [x1, x2] = affectedColumnsRanges[j]
        for (let k = x1; k <= x2; k++) {
            if (!isIntegerChar(line[k])) {
                if (line[k] === '.' || line[k] === '░') {
                    if (lines[i][k] === '░') lines[i][k] = '▒'
                    if (lines[i][k] !== '▒') lines[i][k] = '░'
                } else if (!['░', '▒', '.'].includes(line[k])) lines[i][k] = '█'
            }
        }
    }
}

console.log(lines.map(x => x.join('')).join('\n'))

function getIntegerHitboxRangesPerLine(lines: string[]) {
    // 2D array (array of lines) of [X1, X2]
    const ranges: Array<Array<[number, number]>> = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const isNotLastIteration = i !== (lines.length - 1)

        // Set stuff
        if (i === 0) ranges[i] = []
        if (isNotLastIteration) ranges[i+1] = []

        let prevMatchWasInt = false
        let firstIntIndexInGroup = -1

        for (let j = 0; j <= line.length; j++) {
            const charIsInt = isIntegerChar(line[j] ?? '.')

            // This means we're in the same number group, so we can just ignore
            if (prevMatchWasInt) {
                if (charIsInt) continue

                // If the character isn't an integer, previous found numbers can just be grouped
                prevMatchWasInt = false

                const bindedClamp = (v: number) => clamp(0, v, line.length - 1)

                const data = [
                    bindedClamp(firstIntIndexInGroup - 1),
                    bindedClamp(j),
                ] as [number, number]

                ranges[i].push(data)
                if (i > 0) ranges[i - 1].push(data)
                if (isNotLastIteration) ranges[i + 1].push(data)
            }

            // We know for sure prevMatchWasInt is false
            if (charIsInt) {
                prevMatchWasInt = true
                firstIntIndexInGroup = j
            }
        }
    }

    return ranges
}

function isIntegerChar(c: string) {
    const cc = c.charCodeAt(0)
    return cc >= 48 && cc <= 57
}

function clamp(min: number, value: number, max: number) {
    return Math.max(Math.min(value, max), min)
}
