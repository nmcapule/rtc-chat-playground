<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let message = 'Ola';

  async function locateUser() {
    message = 'Locating....';
    try {
      const position = await requestCurrentPosition();
      message = JSON.stringify(position, null, 2);
      dispatch('locate', position);
    } catch (error) {
      message = error.message;
    }
  }

  async function requestCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Browser does not support geolocation'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position: Position) =>
          resolve({
            coords: {
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
            },
            timestamp: position.timestamp,
          }),
        reject,
      );
    });
  }
</script>

<style lang="scss">
  .chatbox-container {
    background-color: #fff;
    width: 30em;
  }

  /** Allow word wrap in code blocks.*/
  code {
    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }
</style>

<div class="card chatbox-container shadow-sm">
  <div class="card-body">
    <pre><code>{message}</code></pre>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary" on:click={locateUser}>Where Am I?</button>
  </div>
</div>
