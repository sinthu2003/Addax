import Navigation from './Navigation'
import { StaticDataProvider } from '../dataContext'
import Footer from './Footer'
import Home from './Home'
import ServicesPage from './ServicesPage'
import BrandCarousel from './BrandCarousel'
import Insurance from './Insurance'
import Statistics from './Statistics'
import Pricing from './Pricing/Pricing'
import Package from './Pricing/Package'
import CustomerReview from './CustomerReview'
import Contact from './Contact'

const Main = () => {
  return (
    <StaticDataProvider>
      <Navigation />
      <Home />
      <BrandCarousel />
      <ServicesPage />
      <Insurance />
      <Statistics />
      <Pricing />
      <Package />
      <CustomerReview />
      <Contact />
      <Footer />
    </StaticDataProvider>
  )
}

export default Main