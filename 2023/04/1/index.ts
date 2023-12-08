import { getInput } from '../../utils/input'
import { getCardsWinnings } from '../shared'

const input = await getInput()
const lines = input.split('\n')

console.log(getCardsWinnings(lines).reduce((pv, cv) => pv + (cv < 1 ? 0 : 2 ** (cv - 1)), 0))
