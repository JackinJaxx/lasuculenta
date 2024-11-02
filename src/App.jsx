import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./router/Router";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
