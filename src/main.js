import App from './App.svelte';

const target = document.getElementById('app');
if (target) {
  target.replaceChildren();
  target.removeAttribute('aria-busy');
}

const app = new App({
  target: target || document.body,
});

export default app;
