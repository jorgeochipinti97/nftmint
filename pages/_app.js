import MintContextProvider from '../context/MintContext'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return(
    <MintContextProvider>
      <Component {...pageProps} />
    </MintContextProvider>
  )

}

export default MyApp
