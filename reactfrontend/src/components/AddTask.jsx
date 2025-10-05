import { useState } from "react";
import TaskService from "../api/TaskService";
import "./Form.css";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "LOW",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TaskService.createTask(task);
      setMessage("✅ Task added successfully!");
      setTask({ title: "", description: "", startDate: "", endDate: "", priority: "LOW" });
    } catch {
      setMessage("❌ Failed to add task!");
    }
  };

  return (
    <div className="container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
        <input type="date" name="startDate" value={task.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={task.endDate} onChange={handleChange} required />
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
