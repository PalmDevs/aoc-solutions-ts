export function getCardsWinnings(lines: string[]) {
    return lines.map(line => {
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
}
