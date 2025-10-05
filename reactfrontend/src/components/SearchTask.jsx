import { useState, useEffect } from "react";
import TaskService from "../api/TaskService";
import "./TaskTable.css";
import "./Form.css";

export default function SearchTask() {
  const [tasks, setTasks] = useState([]);      // store all tasks
  const [filteredTasks, setFilteredTasks] = useState([]); // store filtered tasks
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await TaskService.getAllTasks();
        setTasks(res.data || []);
        setFilteredTasks(res.data || []);
      } catch (err) {
        console.error("Error loading tasks:", err);
        setTasks([]);
        setFilteredTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter dynamically when search changes
  useEffect(() => {
    if (!search.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const query = search.toLowerCase().trim();
    const filtered = tasks.filter((t) =>
      Object.values(t)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );

    setFilteredTasks(filtered);
  }, [search, tasks]);

  return (
    <div className="container">
      <h2>Search Tasks</h2>

      <div className="form-container">
        <input
          type="text"
          placeholder="Search by any field (ID, title, description, priority, status...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>Clear</button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Loading tasks...</p>
      ) : filteredTasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.startDate}</td>
                <td>{t.endDate}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>❌ No matching tasks found</p>
      )}
    </div>
  );
}
