import { Todos } from "./components/Todos"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const App = () => {
  return (
    <div className="todoapp">
      <Header />
      <Todos />
      <Footer />
    </div>
  )
}

export default App
