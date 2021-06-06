import '../styles/globals.css'
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL  
  return <Component {...pageProps} />
}

export default MyApp
