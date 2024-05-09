<script>
  import uniqid from "uniqid";
  import { user } from "../../util/auth";
  import { onDestroy } from "svelte";
  import { createNewWorkout, updateWorkout } from "../../api/workouts";
  import { navigate } from "svelte-routing";

  let authUser;
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  let workoutName = "";
  let workoutDate = "";
  let workoutType = "none";
  let excercises = [{ name: "", qt: "", id: uniqid() }];

  const addExc = () => {
    excercises = excercises.concat({ name: "", qt: "", id: uniqid() });
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    if (name === "qt") {
      excercises = excercises.map((exc) => {
        if (exc.id === id) {
          return { ...exc, qt: value };
        }
        return exc;
      });
    }
    if (name === "execName") {
      excercises = excercises.map((exc) => {
        if (exc.id === id) {
          return { ...exc, name: value };
        }
        return exc;
      });
    }
  };

  const handleDelete = (id) => {
    excercises = excercises.filter((item) => item.id !== id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId: authUser.uid,
      name: workoutName,
      date: workoutDate,
      category: workoutType,
      excercises: JSON.stringify(excercises),
    };
    createNewWorkout(payload).then(({ name }) => {
      updateWorkout({ fbKey: name }).then(() => {
        navigate("/workouts");
      });
    });
  };

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  <form on:submit={handleSubmit}>
    <div class="top-info">
      <label for="name">Workout Title</label>
      <input type="text" name="name" bind:value={workoutName} />
      <label for="name">Date</label>
      <input type="date" name="date" bind:value={workoutDate} />
      <label for="category">Category</label>
      <select name="type" id="category" bind:value={workoutType}>
        <option value="none">Choose a category</option>
        <option value="Strength">Strength</option>
        <option value="Strength">Cardio</option>
        <option value="Flexbility">Flexbility</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Mixed">Mixed</option>
      </select>
    </div>
    <h3>
      <div>Excercises:</div>
      <button on:click={addExc}>Add +</button>
    </h3>
    <div class="row">
      <div>Qt.</div>
      <div>Excercise</div>
    </div>
    {#each excercises as exc}
      <div class="row">
        <div id="col1">
          <label for="qt"></label>
          <input
            type="text"
            name="qt"
            on:input={(e) => handleChange(exc.id, e)}
            value={exc.qt}
          />
        </div>
        <div id="col2">
          <label for="execName"></label>
          <input
            type="text"
            name="execName"
            on:input={(e) => handleChange(exc.id, e)}
            value={exc.name}
          />
        </div>
        <div id="col3">
          <button
            class="delete"
            on:click={() => {
              handleDelete(exc.id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    {/each}
    <button type="submit"> Save Workout </button>
  </form>
</main>

<style>
  label {
    text-align: left;
  }
  h3 {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top-info {
    border-bottom: 1px solid lightgray;
  }

  #col3 {
    padding-top: 6px;
  }

  .row {
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25fr;
    gap: 8px;
  }
</style>
