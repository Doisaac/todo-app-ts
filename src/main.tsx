import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "todomvc-app-css/index.css"
import { TodosProvider } from "./context/Todos.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </StrictMode>
)
