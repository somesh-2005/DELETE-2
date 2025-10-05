import { useEffect, useState } from "react";
import TaskService from "../api/TaskService";
import "./Form.css";
import "./TaskTable.css";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "LOW",
    status: "ASSIGNED",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await TaskService.getAllTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await TaskService.updateTask(editingTask.id, form);
        setEditingTask(null);
      } else {
        await TaskService.createTask(form);
      }
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "LOW",
        status: "ASSIGNED",
      });
      loadTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm(task);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await TaskService.deleteTask(id);
      loadTasks();
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: "LOW",
      status: "ASSIGNED",
    });
  };

  return (
    <div className="container">
      <h2>{editingTask ? "✏️ Edit Task" : "➕ Add Task"}</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ASSIGNED">Assigned</option>
          <option value="PROGRESS">Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && (
          <button type="button" onClick={cancelEdit} style={{ backgroundColor: "#6c757d" }}>
            Cancel
          </button>
        )}
      </form>

      <h2 style={{ marginTop: "40px" }}>📋 All Tasks</h2>
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
          {tasks.length > 0 ? (
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
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
