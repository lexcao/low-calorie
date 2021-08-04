<script>
  import Router from 'svelte-spa-router'
  import routes from "./helper/routes"
</script>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
        @apply bg-gray-50
    }
</style>

<Router {routes}/>
