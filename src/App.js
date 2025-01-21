import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import Notfound from "./components/Notfound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
