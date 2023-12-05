import { Readable } from 'stream'

export function streamToString(stream: Readable) {
    const chunks: string[] = []
    return new Promise<string>((resolve, reject) => {
        let timeout = setInterval(() => resolve(chunks.join('')), 1000)
        stream.on('data', chunk => (chunks.push(chunk), clearTimeout(timeout), setInterval(() => resolve(chunks.join('')), 1000)))
        stream.on('end', () => resolve(chunks.join('')))
        stream.on('error', reject)
    })
}
