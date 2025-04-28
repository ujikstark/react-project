import { Toaster } from "./components/ui/sonner"
import { routes } from './common/routes';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      {routes}
    </div>
  )
}

export default App
