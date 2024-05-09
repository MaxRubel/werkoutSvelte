<script>
  export let handleChange;
  export let handleDelete;
  export let handleCompleted;
  export let exc;
  let isCompleted;
  $: {
    if (exc.completed) {
      isCompleted = true;
    } else {
      isCompleted = false;
    }
  }
</script>

<main>
  <article style="background-color: {isCompleted ? 'lightgrey' : ''}">
    <header style="background-color: {isCompleted ? 'lightgrey' : ''}">
      <div
        class="row"
        style="background-color: {isCompleted ? 'lightgrey' : ''}"
      >
        <div><b>Qt.</b></div>
        <div><b>Excercise</b></div>
      </div>
    </header>
    <div class="row">
      <div id="col1">
        <label for="qt"></label>
        <input
          type="text"
          name="qt"
          on:input={(e) => handleChange(exc.id, e)}
          value={exc.qt}
          style="background-color: {isCompleted ? 'lightgrey' : ''}"
        />
      </div>
      <div id="col2">
        <label for="execName"></label>
        <input
          type="text"
          name="execName"
          on:input={(e) => handleChange(exc.id, e)}
          value={exc.name}
          style="background-color: {isCompleted ? 'lightgrey' : ''}"
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
      <textarea
        on:input={(e) => handleChange(exc.id, e)}
        name="notes"
        style="background-color: {isCompleted ? 'lightgrey' : ''}"
      ></textarea>
    </div>
    <div class="fin-btn">
      <button
        class="completed"
        type="button"
        on:click={() => {
          handleCompleted(exc.id);
        }}>complete</button
      >
    </div>
  </article>
</main>

<style>
  header {
    padding: 0px;
    margin: 0px;
  }

  button {
    margin: 0px;
  }

  .row {
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25;
    gap: 8px;
    padding: 4px 0px;
  }
  .fin-btn {
    display: flex;
    justify-content: center;
  }
  .completed {
    background-color: black;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    text-align: left;
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
