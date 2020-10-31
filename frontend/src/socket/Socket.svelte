<script lang="ts">
  let users = ['hey', 'get', ' your ', 'game', 'on'];
</script>

<style lang="scss">
  .socket-container {
    color: #3a3a3a;
  }
</style>

<div class="socket-container">
  <ul>
    {#each users as user}
      <li class="entry">{user}</li>
    {/each}
  </ul>
</div>
