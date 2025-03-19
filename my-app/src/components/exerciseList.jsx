import Exercise from "./exercise";

export default function ExerciseList(props) {
  return (
    <div class="exercise-list">
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
      {props.exercises.map((exercise, index) => (
        <Exercise
          key={index}
          name={exercise.name}
          description={exercise.description}
          category={exercise.category}
          sets={exercise.sets}
          reps={exercise.reps}
          rest={exercise.rest}
        />
      ))}
    </div>
  );
}
