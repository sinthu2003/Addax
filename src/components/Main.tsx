import Navigation from './Navigation'
import { StaticDataProvider } from '../dataContext'
import Footer from './Footer'
import Home from './Home'
import ServicesPage from './ServicesPage'
import BrandCarousel from './BrandCarousel'
import Insurance from './Insurance'

const Main = () => {
  return (
    <StaticDataProvider>
      <Navigation />
      <Home />
      <BrandCarousel />
      <ServicesPage />
      <Insurance />
      <Footer />
    </StaticDataProvider>
  )
}

export default Main