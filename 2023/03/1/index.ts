import { getInput } from "../../utils/input";

const input = await getInput()
const lines = input.split('\n')
const positionToFindSymbols = getIntegerHitboxRangesPerLine(lines)
const toSum = []
// positionToFindSymbols.map((v, i) => console.log(i, v.map(x => x.join('-')).join(', ')))

// TODO: fix duplicates
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const affectedColumnsRanges = positionToFindSymbols[i]
  for (let j = 0; j < affectedColumnsRanges.length; j++) {
    const [data, x, y] = affectedColumnsRanges[j]
    for (let k = x; k <= y; k++) {
      if (
        !isIntegerChar(line[k]) && line[k] !== '.'
      ) {
        toSum.push(data.value)
      }
    }
  }
}

const sum = toSum.reduce((pv, cv) => pv + cv, 0)
console.log(sum)

function getIntegerHitboxRangesPerLine(lines: string[]) {
    const ranges: Array<Array<[{ value: number, index: [number, number] }, number, number]>> = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let prevWasInt = false
      let firstIntIndexInGroup = -1
      for (let j = 0; j < lines.length; j++) {
        const charIsInt = isIntegerChar(line[j])
        if (
          charIsInt &&
          !prevWasInt
        ) {
          prevWasInt = true
          firstIntIndexInGroup = j
        } else if (prevWasInt && !charIsInt) {
          prevWasInt = false

          ranges[i-1] ??= []
          ranges[i] ??= []
          ranges[i+1] ??= []

          const bindedClamp = (v: number) => clamp(0, v, line.length - 1)

          const columnRanges = [
            {
              value: Number(line.slice(firstIntIndexInGroup, j)),
              index: [firstIntIndexInGroup-1, j-1]
            },
            bindedClamp(firstIntIndexInGroup-1), 
            bindedClamp(j+1)
          ] as typeof ranges[number][number]

          if (i > 0) ranges[i-1]!.push(columnRanges)
          if ((i + 1) < lines.length) ranges[i+1]!.push(columnRanges)
          ranges[i]!.push(columnRanges)
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