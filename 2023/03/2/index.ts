import { getInput } from '../../utils/input'

const input = await getInput(true)
const lines = input.split('\n')

const alreadyMatchedIntsFirstIndexes = new Map<number, Set<number>>()
const matchedInts: Array<[number, number]> = []
const positionToFindIntegers = getGearHitboxRanges(lines)

let sum = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const affectedColumnsRanges = positionToFindIntegers[i]

    const set = new Set<number>()
    alreadyMatchedIntsFirstIndexes.set(i, set)

    for (let j = 0; j < affectedColumnsRanges.length; j++) {
        const [id, x1, x2] = affectedColumnsRanges[j]

        for (let k = x1; k <= x2; k++) {
            if (isIntegerChar(line[k] ?? '')) {
                let intString = ''
                let p = k

                while (p >= 0 && isIntegerChar(line[p])) {
                    intString = line[p--] + intString
                }

                if (set.has(p)) break
                set.add(p)

                p = k + 1

                while (p < line.length && isIntegerChar(line[p])) {
                    intString += line[p++]
                }

                matchedInts[id].push(Number(intString))
            }
        }
    }
}

for (const [x, y] of matchedInts) {
    if (x && y) sum += x * y
}

console.log(sum)

function getGearHitboxRanges(lines: string[]) {
    // 2D array (array of lines) of [GID, X1, X2]
    const ranges: Array<Array<[number, number, number]>> = []
    let id = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const isNotLastIteration = i !== lines.length - 1

        // Set stuff
        if (i === 0) ranges[i] = []
        if (isNotLastIteration) ranges[i + 1] = []

        for (let j = 0; j <= line.length; j++) {
            if (line[j] !== '*') continue

            const bindedClamp = (v: number) => clamp(0, v, line.length - 1)

            const data = [id++, bindedClamp(j - 1), bindedClamp(j + 1)] as [number, number, number]

            // @ts-expect-error It will be set later anyways, calm down!
            matchedInts[data[0]] = []

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
