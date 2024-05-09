<script>
  // @ts-nocheck

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
  import { getSingleSession, updateSession } from "../../api/sessions";
  import { update } from "firebase/database";
  import ExCard from "../ExCard.svelte";

  let authUser;
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  let workoutName = "";
  let workoutDate = "";
  let workoutType = "none";
  let excercises = [{ name: "", qt: "", id: uniqid(), completed: false }];
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const param = url.pathname.split("/").pop();
  onMount(() => {
    getSingleSession(param).then((data) => {
      workoutName = data.name;
      workoutType = data.category;
      excercises = JSON.parse(data.excercises);
      console.log(data);
    });
  });

  const addExc = () => {
    excercises = excercises.concat({
      name: "",
      qt: "",
      id: uniqid(),
      completed: false,
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
  };

  const handleDelete = (id) => {
    excercises = excercises.filter((item) => item.id !== id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId: authUser.uid,
      fbKey: param,
      name: workoutName,
      date: workoutDate,
      category: workoutType,
      excercises: JSON.stringify(excercises),
    };
    updateSession(payload);
  };

  const handleCompleted = (id) => {
    excercises = excercises.map((exc) => {
      if (exc.id === id) {
        return { ...exc, completed: !exc.completed };
      }
      return exc;
    });
  };

  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  <form on:submit={handleSubmit}>
    <div class="top-info">
      <h1>{workoutName}</h1>
      <h3><i>{workoutType}</i></h3>
      <input type="date" name="date" bind:value={workoutDate} />
    </div>
    <!-- <div class="row" style="padding: 17px">
      <div><b>Qt.</b></div>
      <div><b>Excercise</b></div>
    </div> -->
    {#each excercises as exc}
      <ExCard {handleChange} {handleDelete} {handleCompleted} {exc} />
    {/each}
    <button type="submit"> Save Session </button>
  </form>
</main>

<style>
  .top-info {
    border-bottom: 1px solid lightgray;
  }

  h3 {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .top-info {
    border-bottom: 1px solid lightgray;
  }
</style>
