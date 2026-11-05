<script>
  import Router from 'svelte-spa-router'
  import routes from "./helper/routes"
</script>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body {
        @apply bg-gray-50 min-w-0 text-gray-900
    }

    a:focus-visible,
    button:focus-visible {
        outline: 2px solid #4f46e5;
        outline-offset: 3px;
    }

    .brand-wordmark {
        display: block;
        width: min(100%, 18rem);
        height: auto;
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 640px) {
        .brand-wordmark {
            width: min(100%, 26rem);
        }
    }
</style>

<Router {routes}/>
