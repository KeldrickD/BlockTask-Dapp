import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check for saved theme preference
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp 