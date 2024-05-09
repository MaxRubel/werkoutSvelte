<script>
  // import { signIn } from "../util/auth";

  // @ts-nocheck
  export let signIn;
</script>

<main>
  Werkout™
  <button
    type="button"
    on:click={() => {
      signIn();
      console.log("signin");
    }}
  >
    Sign In
  </button>
</main>

<style></style>
