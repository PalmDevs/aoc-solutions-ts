import { getInput } from '../../utils/input'
import { getCardsWinnings } from '../shared'

const input = await getInput()
const lines = input.split('\n')

const cardsWinnings = getCardsWinnings(lines)
const cardsCount: number[] = []

addCountToCards()
console.log(cardsCount.reduce((pv, cv) => pv + cv, 0))

function addCountToCards(startIndex = 0, endIndex = cardsWinnings.length) {
    for (let i = startIndex; i < endIndex; i++) {
        const winnings = cardsWinnings[i]
        if (!cardsCount[i]) cardsCount[i] = 0
        cardsCount[i]++
        addCountToCards(i + 1, i + winnings + 1)
    }
}
