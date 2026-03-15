import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar/Navbar"
import Hero from "./sections/hero/Hero"
import About from "./sections/about/About"
import Services from "./sections/services/Services"
import Team from "./sections/team/Team"
import Partners from "./sections/partners/Partners"
import Results from "./sections/results/Results"
import MasterResults from "./sections/masterResults/MasterResults"
import Publications from "./sections/publications/Publications"
import Branches from "./sections/branches/Branches"
import NotFound from "./pages/NotFound"

function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Hero />
        <About />
        <Services />
        <Team />
        <Partners />
        <Branches />
        <Results />
        <MasterResults />
        <Publications />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App