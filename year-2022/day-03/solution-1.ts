// Splits input to Array<[ firstHalf as string, secondHalf as string ]>
export function splitInput(input: string): [string, string][] {
    return input
        .split('\n')
        .map(line => {
            const { length } = line, halfLength = length / 2
            return [
                line.slice(0, halfLength),
                line.slice(halfLength, length)
            ]
        })
}


// Find a common letter in every string
export function findCommonLetter(first: string, ...rest: string[]) {
    for (const x of first.split('')) {
        if (rest.every(str => str.includes(x))) return x
    }
}


// Maps a letter to a number (a to z = 1 to 26, A to Z = 27 to 52)
export function mapLetter(x: string) {
    const letter = x[0], charCode = letter.charCodeAt(0)
    if (letter.toUpperCase() === letter) return charCode - 38
    return charCode - 96
}


// Get answer
export function getAnswer(input: string) {
    return splitInput(input)
        .map(lines => findCommonLetter(...lines)!)
        .map(mapLetter)
        .reduce((acc, cur) => acc + cur)    
}
