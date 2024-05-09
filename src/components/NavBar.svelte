<script>
  import { navigate } from "svelte-routing";
  const goHome = () => {
    navigate(`/`, { replace: true });
  };
</script>

<main>
  <nav>
    <ul>
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li class="pointer" on:click={goHome}><strong>Werkout</strong></li>
    </ul>
    <ul>
      <li><a href="/workouts">Workouts</a></li>
      <li><a href="/sessions">Sessions</a></li>
      <li><a href="/snapshots">Snapshots</a></li>
    </ul>
  </nav>
</main>
