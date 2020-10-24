<script lang="ts">
  import Playground from './playground/Playground.svelte';

  export let name: string;

  $: object = {
    thing: `the powah is in yo <strong>hands</strong>!`,
    name: name,
  };
</script>

<style type="text/scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;

    > input {
      max-width: 5em;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hallo <input type="text" bind:value={name} />!</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <Playground {...object} />
</main>
