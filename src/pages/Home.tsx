import 'leaflet/dist/leaflet.css';
import { useRoutes } from 'react-router-dom';
import "../App.css";
import Home from '../Home';
function App() {
  const routes = useRoutes([
    {
      path: '/', element: <Home />
    }
  ])
  return (
    routes
  )
}

export default App
