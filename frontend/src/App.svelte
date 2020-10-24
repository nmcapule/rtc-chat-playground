<script>
  import { Router, Link, Route } from 'svelte-routing';

  import Placeholder from './placeholder/Placeholder.svelte';
  import Playground from './playground/Entry.svelte';

  export let url = '';
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/placeholder">Placeholder</Link>
    <Link to="/playground">Playground</Link>
  </nav>
  <div>
    <Route path="/playground">
      <Playground />
    </Route>
    <Route path="/placeholder">
      <Placeholder />
    </Route>
    <Route path="/">
      <Playground />
    </Route>
  </div>
</Router>
