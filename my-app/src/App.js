import "./App.css";
import ExerciseList from "./components/exerciseList";

function App() {
  const demoData = [
    {
      name: "Bench Press",
      description: "Lay on a bench and press a barbell up and down",
      category: "Chest",
      sets: 3,
      reps: 10,
      rest: 60,
    },
    {
      name: "Squat",
      description: "Stand with a barbell on your  back and squat down",
      category: "Legs",
      sets: 3,
      reps: 10,
      rest: 60,
    },
    {
      name: "Deadlift",
      description: "Lift a barbell off the ground to hip level",
      category: "Back",
      sets: 3,
      reps: 10,
      rest: 60,
    },
    {
      name: "Pull-up",
      description: "Lift your body up to a bar",
      category: "Back",
      sets: 3,
      reps: 10,
      rest: 60,
    },
  ];

  return (
    <div class="App">
      <ExerciseList exercises={demoData} />
    </div>
  );
}

export default App;
