<script lang="ts">
  export let message = 'Hello world';
</script>

<style lang="scss">
  .placeholder-container {
    min-height: 25em;

    > .message {
      background-color: #efefef;
    }
  }
</style>

<div class="placeholder-container">
  I am a placeholder message:
  <span class="message">{message}</span>
</div>
