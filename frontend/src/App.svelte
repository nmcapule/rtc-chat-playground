<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';

  import Placeholder from './placeholder/Placeholder.svelte';
  import Playground from './playground/Entry.svelte';
  import Leaflet from './leaflet/Leaflet.svelte';
  import Socket from './socket/Socket.svelte';

  export let url = '';
</script>

<style lang="scss">
  .nav-container {
    position: fixed;
    right: 0;
    z-index: 1000;
    background-color: #fff;
  }
  .main-container {
    width: 100%;
    height: 100%;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous" />
</svelte:head>

<Router {url}>
  <nav class="nav-container">
    <Link to="/">Home</Link>
    <Link to="/placeholder">Placeholder</Link>
    <Link to="/socket">Socket</Link>
    <Link to="/leaflet">Leaflet</Link>
  </nav>
  <div class="main-container">
    <Route path="/leaflet">
      <Leaflet />
    </Route>
    <Route path="/socket">
      <Socket />
    </Route>
    <Route path="/placeholder">
      <Placeholder />
    </Route>
    <Route path="/">
      <Playground />
    </Route>
  </div>
</Router>
