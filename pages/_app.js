import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check for saved theme preference or system preference
    if (localStorage.getItem('darkMode') === 'true' ||
        (!('darkMode' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp 