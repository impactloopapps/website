// Rasterizes brand SVGs into the PNGs referenced by index.html (OG card + apple-touch icon).
// Run with: pnpm assets
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = resolve(root, 'public')
mkdirSync(pub, { recursive: true })

const loopPath =
  'M250 250 C 195 145, 70 145, 70 250 C 70 355, 195 355, 250 250 ' +
  'C 305 145, 430 145, 430 250 C 430 355, 305 355, 250 250 Z'

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="28%" cy="22%" r="95%">
      <stop offset="0%" stop-color="#101426"/>
      <stop offset="100%" stop-color="#05060A"/>
    </radialGradient>
    <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7C5CFF"/>
      <stop offset="50%" stop-color="#22D3EE"/>
      <stop offset="100%" stop-color="#E879F9"/>
    </linearGradient>
    <linearGradient id="word" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#C7D2FE"/>
    </linearGradient>
    <filter id="blur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="90"/></filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1010" cy="120" r="220" fill="#7C5CFF" opacity="0.45" filter="url(#blur)"/>
  <circle cx="1150" cy="430" r="200" fill="#22D3EE" opacity="0.35" filter="url(#blur)"/>
  <circle cx="120" cy="560" r="200" fill="#E879F9" opacity="0.28" filter="url(#blur)"/>

  <g transform="translate(96 96) scale(0.5)">
    <path d="${loopPath}" fill="none" stroke="url(#stroke)" stroke-width="34"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <text x="96" y="360" font-family="Helvetica, Arial, sans-serif" font-size="116"
    font-weight="700" fill="url(#word)" letter-spacing="-3">Impact Loop</text>
  <text x="100" y="430" font-family="Helvetica, Arial, sans-serif" font-size="38"
    font-weight="400" fill="#9aa3c7">Apps that compound effort into a loop of learning &amp; impact.</text>
  <text x="100" y="540" font-family="Helvetica, Arial, sans-serif" font-size="26"
    font-weight="700" fill="#22D3EE" letter-spacing="4">CRACKLOOP · INDIE APP STUDIO</text>
</svg>`

const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="b" cx="30%" cy="25%" r="100%">
      <stop offset="0%" stop-color="#171b2b"/><stop offset="100%" stop-color="#05060A"/>
    </radialGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7C5CFF"/><stop offset="50%" stop-color="#22D3EE"/>
      <stop offset="100%" stop-color="#E879F9"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#b)"/>
  <g transform="translate(6 6)">
    <path d="${loopPath}" fill="none" stroke="url(#s)" stroke-width="44"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`

await sharp(Buffer.from(ogSvg)).png().toFile(resolve(pub, 'og.png'))
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(resolve(pub, 'apple-touch-icon.png'))
console.log('Generated public/og.png and public/apple-touch-icon.png')
