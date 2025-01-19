import { Todos } from "./componets/Todos"
import { Footer } from "./componets/Footer"
import { Header } from "./componets/Header"

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
