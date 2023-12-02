import { existsSync } from 'fs'
import { readFile } from 'fs/promises'

import { streamToString } from './stream'

export async function getRawInput(attemptToLookInParentDir = false) {
    if (existsSync('./input.txt')) return await readFile('./input.txt', 'utf-8')
    if (attemptToLookInParentDir && existsSync('../input.txt')) return await readFile('../input.txt', 'utf-8')

    const stdinContents = await streamToString(process.stdin)
    if (stdinContents.length) return stdinContents

    throw new Error('No input was provided')
}

export async function getInput(attemptToLookInParentDir = false) {
    return (await getRawInput(attemptToLookInParentDir)).trim().replace(/\r\n/g, '\n')
}
