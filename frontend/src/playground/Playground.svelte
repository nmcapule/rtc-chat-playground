<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { time } from './stores';

  export let thing = `oh no <strong>!!!!</strong>`;
  export let name: string;

  const dispatch = createEventDispatcher();

  let clicks = 0;
  let trapHistory = [];
  let promise = until2secs();

  async function until2secs(): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (Math.random() < 0.5) throw new Error('ohshit');
    return Math.random();
  }

  function handleClick() {
    clicks += 1;
    promise = until2secs();

    dispatch('message', { text: 'Hello', clicks });
  }

  $: trap = clicks / 2;
  $: {
    trapHistory = [...trapHistory, trap];
    if (trapHistory.length > 5) {
      trapHistory = trapHistory.slice(1);
    }
  }
  $: console.log(`hell naw it's a ${trapHistory}`);
</script>

<style type="text/scss">
  div {
    > button {
      color: red;
      background-color: yellow;
    }

    > .html-test {
      border: 1px solid blue;
      > span {
        display: block;
      }
    }
  }
</style>

<div>
  <button on:click={handleClick}>{$time} Click me pls {name}: x{clicks}/{trap}</button>
  <input
    type="range"
    bind:value={clicks}
    min="0"
    max={clicks + 100 * Math.floor(1 + clicks / 100)} />
  {#await promise}
    <p>waiting for promise</p>
  {:then randomnumber}
    <p>I got a {randomnumber}</p>
  {:catch error}
    <p>OHNO {error}</p>
  {/await}
  <div class="html-test">
    {#if clicks % 5 === 0}
      <span>Crooo... crooo...</span>
    {:else if clicks % 2}
      <span>This the first {thing}.</span>
    {:else}
      <span>
        But this is another
        {@html thing}
      </span>
    {/if}
  </div>
  {#each trapHistory as trap, i (trap)}
    <!-- Avoid distracting elements my ass. -->
    <div>
      <marquee>{trap} #{i}</marquee>
    </div>
  {/each}
  {#each trapHistory as trap, i}
    <!-- Avoid distracting elements my ass. -->
    <div on:mousemove={(e) => handleClick()}>
      <marquee>{trap} #{i}</marquee>
    </div>
  {/each}
</div>
