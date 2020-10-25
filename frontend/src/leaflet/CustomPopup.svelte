<script lang="ts">
  export let message = '';
</script>

<style lang="scss">
  .popup-container {
    background-color: black;
    padding: 0.2em;
    color: white;
    text-align: left;
  }
</style>

<pre class="popup-container">
  {@html message}
</pre>
