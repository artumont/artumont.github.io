import localFont from 'next/font/local'
import { Inter, JetBrains_Mono } from 'next/font/google'

export const pixelOperator = localFont({
    src: './pixel-operator.ttf',
    display: 'swap',
})

export const inter = Inter(
    {
        weight: [400, 500, 700],
        display: 'swap',
    }
)
export const jetBrainsMono = JetBrains_Mono()