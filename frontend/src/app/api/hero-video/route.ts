import { NextResponse } from 'next/server'
import path from 'path'
import { stat, readFile } from 'fs/promises'

export async function GET() {
  try {
    const videoPath = path.join(process.cwd(), 'src', 'app', 'assets', 'tachbg.mp4')
    // Ensure the file exists
    await stat(videoPath)
  const file = await readFile(videoPath)
  const uint8 = new Uint8Array(file)
  const blob = new Blob([uint8], { type: 'video/mp4' })
    // Use the Web Fetch API Response with a Blob to satisfy TS BodyInit
    return new Response(blob, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }) as unknown as NextResponse
  } catch (err) {
    return new NextResponse('Video not found', { status: 404 })
  }
}
