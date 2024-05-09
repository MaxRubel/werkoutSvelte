<script>
  import { onDestroy, onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { user } from "../util/auth";
  import { getUserSessions } from "../api/sessions";

  let authUser;
  let sessions = [];
  const unsubscribe = user.subscribe((value) => {
    authUser = value;
  });

  onMount(() => {
    getUserSessions(authUser.uid).then((data) => [(sessions = data)]);
  });

  onDestroy(() => {
    unsubscribe();
  });

  const goToSession = (fbKey) => {
    navigate(`/sessionForm/${fbKey}`);
  };
</script>

<main>
  <div class="view-workouts">
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {#each sessions as sesh}
          <tr
            class="pointer"
            on:click={() => {
              goToSession(sesh.fbKey);
            }}
          >
            <th scope="row">{sesh.name}</th>
            <td>{sesh.category}</td>
            <td>{sesh.date}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  .view-workouts {
    margin-top: 20px;
  }
</style>
