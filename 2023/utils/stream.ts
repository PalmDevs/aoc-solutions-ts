export function streamToString(stream: NodeJS.ReadableStream) {
    const chunks: string[] = []
    return new Promise<string>((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('end', () => resolve(chunks.join('')))
        stream.on('error', reject)
    })
}
