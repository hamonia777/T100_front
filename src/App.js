import Login from "./Login";
import Sign from "./Sign";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
