import React, { useEffect, useState } from "react";
import Exercise from "./exercise";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    sets: "",
    reps: "",
    rest: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      fetch(`http://localhost:5001/exercises/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).then(() => {
        setExercises(
          exercises.map((ex) =>
            ex.id === editing ? { id: editing, ...form } : ex
          )
        );
        setEditing(null);
        setForm({
          name: "",
          description: "",
          category: "",
          sets: "",
          reps: "",
          rest: "",
        });
      });
    } else {
      fetch("http://localhost:5001/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((newExercise) => setExercises([...exercises, newExercise]));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/exercises/${id}`, { method: "DELETE" }).then(
      () => setExercises(exercises.filter((exercise) => exercise.id !== id))
    );
  };

  const handleEdit = (exercise) => {
    setForm(exercise);
    setEditing(exercise.id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="form-content"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="form-content"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className="form-content"
        />
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={form.sets}
          onChange={handleChange}
          required
          className="form-content"
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={form.reps}
          onChange={handleChange}
          required
          className="form-content"
        />
        <input
          type="number"
          name="rest"
          placeholder="Rest (seconds)"
          value={form.rest}
          onChange={handleChange}
          required
          className="form-content"
        />
        <button type="submit">
          {editing !== null ? "Update Exercise" : "Add Exercise"}
        </button>
      </form>
      <div className="exercise-list">
        <div class="exercise-row exercise-header">
          <h3 class="exercise-text">Name</h3>
          <h3 class="exercise-text">Description</h3>
          <div class="exercise-text">
            <h3>Category</h3>
            <h3>Sets</h3>
            <h3>Reps</h3>
            <h3>Rest</h3>
          </div>
        </div>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <Exercise {...exercise} />
            <button onClick={() => handleEdit(exercise)}>Edit</button>
            <button onClick={() => handleDelete(exercise.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
