<script lang="ts">
  export let thing = `oh no <strong>!!!!</strong>`;

  let clicks = 0;
  let trapHistory = [];

  function handleClick() {
    clicks += 1;
  }

  $: trap = clicks / 2;
  $: trapHistory = [...trapHistory, trap];
  $: console.log(`hell naw it's a ${trapHistory}`);
</script>

<style type="text/scss">
  div {
    > button {
      color: red;
      background-color: yellow;
    }
  }
</style>

<div>
  <button on:click={handleClick}>Click me pls x{clicks}/{trap}</button>
  <div>
    <span>This the {thing}.</span>
    <span>
      But this is another
      {@html thing}
    </span>
  </div>
</div>
