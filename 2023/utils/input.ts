import { existsSync } from 'fs'
import { readFile } from 'fs/promises'

import { streamToString } from './stream'

export async function getRawInput() {
    if (existsSync('./input.txt')) return await readFile('./input.txt', 'utf-8')

    const stdinContents = await streamToString(process.stdin)
    if (stdinContents.length) return stdinContents
    
    throw new Error('No input was provided')
}

export async function getInput() {
    return (await getRawInput()).trim().replace(/\r\n/g, '\n')
}