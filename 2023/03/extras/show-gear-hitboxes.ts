import { getInput } from '../../utils/input'

const input = await getInput(true)
const lines = input.split('\n').map(x => x.split(''))

const positionToFindIntegers = getGearHitboxRanges(input.split('\n'))

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const affectedColumnsRanges = positionToFindIntegers[i]

    for (let j = 0; j < affectedColumnsRanges.length; j++) {
        const [x1, x2] = affectedColumnsRanges[j]

        for (let k = x1; k <= x2; k++) {
            if ((!isIntegerChar(line[k]) && line[k] !== '*') || line[k] === '░') {
                if (line[k] === '░') line[k] = '▒'
                if (line[k] !== '▒') line[k] = '░'
            }

            if (isIntegerChar(line[k] ?? '')) {
                let p = k - 1
                line[k] = '▓'

                while (p >= 0 && isIntegerChar(line[p]) && line[p]) {
                    line[p] = '▞'
                    p--
                }

                p = k + 1

                while (p < line.length && isIntegerChar(line[p])) {
                    line[p] = '▞'
                    p++
                }
            }
        }
    }
}

console.log(lines.map(x => x.join('')).join('\n'))

function getGearHitboxRanges(lines: string[]) {
    // 2D array (array of lines) of [X1, X2]
    const ranges: Array<Array<[number, number]>> = []
    const id = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const isNotLastIteration = i !== lines.length - 1

        // Set stuff
        if (i === 0) ranges[i] = []
        if (isNotLastIteration) ranges[i + 1] = []

        for (let j = 0; j <= line.length; j++) {
            if (line[j] !== '*') continue

            const bindedClamp = (v: number) => clamp(0, v, line.length - 1)

            const data = [bindedClamp(j - 1), bindedClamp(j + 1)] as [number, number]

            ranges[i].push(data)
            if (i > 0) ranges[i - 1].push(data)
            if (isNotLastIteration) ranges[i + 1].push(data)
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
