<script>
  export let handleChange;
  export let handleDelete;
  export let exc;
</script>

<main>
  <article>
    <header>
      <div class="row">
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
    <div class="fin-btn">
      <button class="completed" type="button">complete</button>
    </div>
  </article>
</main>

<style>
  .top-info {
    border-bottom: 1px solid lightgray;
  }
  header {
    padding: 0px;
    margin: 0px;
  }

  .row {
    display: grid;
    grid-template-columns: 0.25fr 1fr 0.25;
    gap: 8px;
    margin-bottom: 10px;
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

  article {
    margin-bottom: 0px;
  }

  label {
    text-align: left;
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
