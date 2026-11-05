<script>
  import {Meal} from "../helper/model";
  import {branding} from "../branding.mjs";
  import Sticks from "../component/Sticks.svelte";
  import Slip from "../component/Slip.svelte";

  let meal = null
  let token = 0

  const drawOne = () => {
    meal = new Meal()
    token += 1
  }
</script>

<div class="stage">
  <p class="tagline">{branding.tagline}</p>
  <div class="actions">
    <a class="btn btn-ink" href="/#/day">抽一天</a>
    <a class="btn" href="/#/week">抽一周</a>
  </div>
  <div class="actions">
    <button class="btn btn-text" type="button" on:click={drawOne}>
      {meal ? "再抽一次" : "抽一餐"}
    </button>
  </div>
  <div aria-live="polite">
    {#if meal}
      {#key token}
        <div class="ritual">
          <Sticks/>
          <div class="slips">
            <Slip i={0} lines={[{label: meal.cooking, text: `${meal.meat} / ${meal.vegetable} / ${meal.carbohydrate} / ${meal.fruit}`}]}/>
          </div>
        </div>
      {/key}
    {:else}
      <p class="quiet">还没抽。抽一天看三餐，或在这里抽一餐。</p>
    {/if}
  </div>
</div>
