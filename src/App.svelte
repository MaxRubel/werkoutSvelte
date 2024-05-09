<script>
  // @ts-nocheck
  import Login from "./components/Login.svelte";
  import { user } from "./util/auth";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import { signIn } from "./util/auth";
  import { onDestroy, onMount } from "svelte";
  import NavBar from "./components/NavBar.svelte";
  import Workouts from "./components/Workouts.svelte";
  import WorkOutForm from "./components/forms/WorkOutForm.svelte";
  import SessionForm from "./components/forms/SessionForm.svelte";
  import Sessions from "./components/Sessions.svelte";

  let authUser;
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<main>
  {#if authUser}
    <NavBar />
    <Router>
      <Route path="/"><Home /></Route>
      <Route path="/workouts"><Workouts /></Route>
      <Route path="/createNewWorkout/"><WorkOutForm /></Route>
      <Route path="/workout/:fbKey"><WorkOutForm /></Route>
      <Route path="/sessionForm/:fbKey"><SessionForm /></Route>
      <Route path="/sessions"><Sessions /></Route>
    </Router>
  {:else}
    <Login {signIn} />
  {/if}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
