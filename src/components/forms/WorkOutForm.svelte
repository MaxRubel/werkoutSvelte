<script>
  import uniqid from "uniqid";
  import { user } from "../../util/auth";
  import { onDestroy, onMount } from "svelte";
  import {
    createNewWorkout,
    getSingleWorkout,
    updateWorkout,
  } from "../../api/workouts";
  import { navigate } from "svelte-routing";
  import getTime from "../../util/dateTimeString";
  import { createSession, updateSession } from "../../api/sessions";

  let authUser;
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  let workoutName = "";
  let workoutDate = "";
  let workoutType = "none";
  let excercises = [{ name: "", qt: "", id: uniqid(), notes: "" }];
  let update = false;

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const param = url.pathname.split("/").pop();

  if (param !== "createNewWorkout") {
    getSingleWorkout(param).then((data) => {
      workoutName = data.name;
      workoutDate = getTime();
      workoutType = data.category;
      excercises = JSON.parse(data.excercises);
      update = true;
    });
  }

  const addExc = () => {
    excercises = excercises.concat({
      name: "",
      qt: "",
      id: uniqid(),
      notes: "",
    });
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
    if (name === "notes") {
      excercises = excercises.map((exc) => {
        if (exc.id === id) {
          return { ...exc, [name]: value };
        }
        return exc;
      });
    }
  };

  const handleNewSession = () => {
    const payload = {
      fbKey: param ? param : null,
      userId: authUser.uid,
      name: workoutName,
      date: workoutDate,
      category: workoutType,
      excercises: JSON.stringify(excercises),
    };
    if (!update) {
      createNewWorkout(payload).then(({ name }) => {
        updateWorkout({ fbKey: name }).then(() => {
          const payload2 = { ...payload, fbKey: null, workoutId: name };
          createSession(payload2).then((data) => {
            updateSession({ fbKey: data.name }).then(() => {
              navigate(`/sessionForm/${data.name}`);
            });
          });
        });
      });
    } else {
      updateWorkout(payload).then(() => {
        const payload2 = { ...payload, fbKey: null, workoutId: payload.fbKey };
        createSession(payload2).then((data) => {
          updateSession({ fbKey: data.name }).then(() => {
            navigate(`/sessionForm/${data.name}`);
          });
        });
      });
    }
  };

  const handleDelete = (id) => {
    excercises = excercises.filter((item) => item.id !== id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.submitter.id;

    if (btn === "createWorkout") {
      const payload = {
        userId: authUser.uid,
        name: workoutName,
        date: workoutDate,
        category: workoutType,
        excercises: JSON.stringify(excercises),
      };
      if (!update) {
        createNewWorkout(payload).then(({ name }) => {
          updateWorkout({ fbKey: name }).then(() => {
            navigate("/workouts");
          });
        });
      }
      if (update) {
        updateWorkout({ ...payload, fbKey: param }).then(() => {
          navigate("/workouts");
        });
      }
    }
    if (btn === "handleNewSession") {
      handleNewSession();
    }
  };

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  <form on:submit={handleSubmit}>
    <div>
      <button class="sesh" type="submit" id="handleNewSession">
        Create Session
      </button>
    </div>
    <div class="top-info">
      <label for="name">Workout Title</label>
      <input type="text" name="name" bind:value={workoutName} required />
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
      <button type="button" on:click={addExc}>Add +</button>
    </h3>
    <div class="row bot">
      <div>Qt.</div>
      <div>Excercise</div>
    </div>
    {#each excercises as exc}
      <article>
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
              required
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
        <div>
          <textarea on:input={(e) => handleChange(exc.id, e)} name="notes"
          ></textarea>
        </div>
      </article>
    {/each}
    <button type="submit" id="createWorkout">
      {#if update}
        Update Workout
      {:else}
        Create Workout
      {/if}
    </button>
  </form>
</main>

<style>
  .sesh {
    margin: 20px 0px;
    width: 100%;
  }

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

  .bot {
    margin-bottom: 20px;
  }
</style>
