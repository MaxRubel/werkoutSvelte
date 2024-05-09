<script>
  import { onDestroy, onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { getUserWorkouts } from "../api/workouts";
  import { user } from "../util/auth";

  let authUser;
  let workouts = [];
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  onMount(() => {
    getUserWorkouts(authUser.uid).then((data) => [(workouts = data)]);
  });

  onDestroy(() => {
    unsubscribe();
  });

  const goToWorkout = (fbKey) => {
    navigate(`/workout/${fbKey}`);
  };
</script>

<main>
  <div class="add-btn">
    <button
      on:click={() => {
        navigate(`/createNewWorkout`, { replace: true });
      }}
      >Create New Workout
    </button>
  </div>
  <div class="view-workouts">
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Date Created</th>
        </tr>
      </thead>
      <tbody>
        {#each workouts as workout}
          <tr
            class="pointer"
            on:click={() => {
              goToWorkout(workout.fbKey);
            }}
          >
            <th scope="row">{workout.name}</th>
            <td>{workout.category}</td>
            <td>{workout.date}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  .add-btn {
    margin-top: 20px;
  }
  .view-workouts {
    margin-top: 20px;
  }
</style>
