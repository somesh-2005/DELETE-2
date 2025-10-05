import { useState, useEffect } from "react";
import TaskService from "../api/TaskService";
import "./TaskTable.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "LOW",
    status:""
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await TaskService.getAllTasks();
    setTasks(res.data || []);
  };

  const handleDelete = async (id) => {
    await TaskService.deleteTask(id);
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm(task);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await TaskService.updateTask(editingTask.id, form);
    setEditingTask(null);
    loadTasks();
  };

  return (
    <div className="container">
      <h2>All Tasks</h2>

      {editingTask && (
        <form onSubmit={handleUpdate} className="form-container">
          <input name="title" value={form.title} onChange={handleChange} required />
          <input name="description" value={form.description} onChange={handleChange} required />
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
           <select name="status" value={form.status} onChange={handleChange}>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button type="submit">Update</button>
        </form>
      )}

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.startDate}</td>
                <td>{t.endDate}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7">No tasks available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
