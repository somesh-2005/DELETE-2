import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskDashboard from "./components/TaskDashboard";
import SearchTask from "./components/SearchTask";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<TaskDashboard />} />
          <Route path="/search" element={<SearchTask />} />
          <Route path="/board" element={<TaskBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
