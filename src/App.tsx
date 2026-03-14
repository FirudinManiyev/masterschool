import Navbar from "./components/layout/Navbar/Navbar"
import Hero from "./sections/hero/Hero"

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <Hero />
      </main>
    </>
  )
}

export default App