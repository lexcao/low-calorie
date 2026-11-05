<script>
  export let i = 0
  export let day = ""
  export let today = false
  export let lines = []
</script>

<article class="slip" style="--i:{i}">
  {#if day}
    <p class="slip-day" class:is-today={today}>{day}</p>
  {/if}
  {#each lines as line}
    <p class="slip-row">
      <span class="slip-label">{line.label}</span>
      <span class="slip-food">{line.text}</span>
    </p>
  {/each}
</article>
