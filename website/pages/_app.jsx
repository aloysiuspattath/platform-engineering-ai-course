import { Inter, Fira_Code } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>
      <main className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
