<script lang="ts">
  import io from 'socket.io-client';
  import { onMount } from 'svelte';

  import { inputText } from './stores';

  /** Helper function for logging. */
  function log(...messages: any[]) {
    const elem = document.createElement('code');
    elem.textContent = `> ${messages.join(' ')}`;
    document.querySelector('div#chat').appendChild(elem);
  }

  /** Connect to socket. */
  const socket = io('http://localhost:3000', { transports: ['websocket'] });
  socket.on('connect', () => {
    log("Whoops, hey you're connected!");
    log();
  });
  socket.on('message', (data) => {
    log('server:', JSON.stringify(data));
  });

  /** Binded to input text box. */
  let inputElem: HTMLInputElement;

  /** Setup subscription to input text box value changes. */
  onMount(() => {
    inputElem.focus();
  });

  /** History trackers. */
  let history = [];
  let historyCursor = 0;

  /** Handle key presses in input text box. */
  function handleInputKeydown(event: any) {
    // Templates.
    if (event.altKey) {
      switch (event.code) {
        case 'Digit1':
          const rnum = Math.floor(Math.random() * 100);
          inputText.set(`{ "type": "login", "username": "Nats ${rnum}" }`);
          break;
        case 'Digit2':
          inputText.set(`{ "type": "logout" }`);
          break;
        case 'Digit3':
          inputText.set('{ "type": "users" }');
          break;
      }
      return;
    }
    if (event.shiftKey) {
      switch (event.code) {
        case 'Enter':
          inputText.update((value) => value + '\n');
          return;
      }
    }

    // History.
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (event.code === 'ArrowUp') {
        historyCursor = Math.min(historyCursor + 1, history.length - 1);
      } else {
        historyCursor = Math.max(historyCursor - 1, 0);
      }
      inputText.set(history[history.length - historyCursor - 1] || '');
      return;
    }

    // Enter.
    if (event.code !== 'Enter') {
      return;
    }

    historyCursor = 0;

    const value = event.target.value;
    try {
      socket.send(JSON.parse(value));
      log(value);
      history.push(value);
      inputText.set('');
    } catch (error) {
      log('error:', error);
    }
  }
</script>

<style lang="scss">
  .chat-input {
    width: 30em;
  }
</style>

<div id="chat" class="chat-container d-flex flex-column" />
<input
  type="text"
  class="chat-input"
  value={$inputText}
  bind:this={inputElem}
  on:keydown={(e) => handleInputKeydown(e)} />
