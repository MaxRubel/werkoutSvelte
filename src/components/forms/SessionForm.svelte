<script>
  // @ts-nocheck

  import uniqid from "uniqid";
  import { user } from "../../util/auth";
  import { onDestroy, onMount } from "svelte";
  import { getSingleSession, updateSession } from "../../api/sessions";
  import ExCard from "../ExCard.svelte";
  import { navigate } from "svelte-routing";

  let authUser;
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  let sessionName = "";
  let sessionDate = "";
  let workoutType = "none";
  let excercises = [{ name: "", qt: "", id: uniqid(), completed: false }];
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const param = url.pathname.split("/").pop();

  onMount(() => {
    getSingleSession(param).then((data) => {
      const [date] = data.date.split(" ");
      sessionDate = date;
      sessionName = data.name;
      workoutType = data.category;
      excercises = JSON.parse(data.excercises);
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
      name: sessionName,
      date: sessionDate,
      category: workoutType,
      excercises: JSON.stringify(excercises),
    };
    updateSession(payload).then(() => {
      navigate("/sessions");
    });
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

  $: {
    if (workoutType === "none") {
      workoutType = "";
    }
  }
</script>

<main>
  <form on:submit={handleSubmit}>
    <h3><i>{workoutType}</i></h3>
    <div class="top-info">
      <input type="text" name="name" bind:value={sessionName} />
      <input type="date" name="date" bind:value={sessionDate} />
    </div>
    <div class="space">
      <button type="button" on:click={addExc}>Add +</button>
    </div>
    {#each excercises as exc}
      <ExCard {handleChange} {handleDelete} {handleCompleted} {exc} />
    {/each}
    <button type="submit" class="space"> Save Session </button>
  </form>
</main>

<style>
  .top-info {
    border-bottom: 1px solid lightgray;
  }

  .space {
    margin: 20px 0px;
    display: flex;
    justify-content: center;
  }

  button {
    margin: 0px;
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
