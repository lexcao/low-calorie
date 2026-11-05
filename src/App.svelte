<script>
  import Router from 'svelte-spa-router'
  import routes from "./helper/routes"
</script>

<style global lang="postcss">
    @tailwind base;
</style>

<Router {routes}/>
