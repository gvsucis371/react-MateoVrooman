export default function Exercise(props) {
  return (
    <div class="exercise-row">
      <p class="exercise-text">{props.name}</p>
      <p class="exercise-text">{props.description}</p>
      <div class="exercise-text">
        <p>{props.category}</p>
        <p>{props.sets}</p>
        <p>{props.reps}</p>
        <p>{props.rest}</p>
      </div>
    </div>
  );
}
