<script lang="ts">
  import { onMount } from 'svelte';
  import io from 'socket.io-client';

  let users = ['hey', 'get', ' your ', 'game', 'on'];

  onMount(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log(socket.nsp);

      socket.emit('users', ['asd']);
      socket.on('users', (data) => {
        console.log('got users', data);
      });

      socket.emit('events', { whats: 'up moth' });
      socket.on('events', (data) => {
        console.log('reply from events:', data);
      });
    });

    return () => {
      socket.close();
    };
  });
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
