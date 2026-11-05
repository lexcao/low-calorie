<script>
  import {OneDay} from "../helper/model";
  import TopBar from "../component/TopBar.svelte";
  import Sticks from "../component/Sticks.svelte";
  import Slip from "../component/Slip.svelte";

  let oneDay = new OneDay()
  let token = 0

  const dateLabel = () => oneDay.time.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  const mealText = (meal) => `${meal.cooking} · ${meal.meat} / ${meal.vegetable} / ${meal.carbohydrate} / ${meal.fruit}`

  const redraw = () => {
    const time = oneDay.time
    oneDay = new OneDay()
    oneDay.time = time
    token += 1
  }
</script>

<div class="stage">
  <TopBar title={dateLabel()} sideHref="/#/week" sideLabel="抽一周"/>
  {#key token}
    <div class="ritual">
      <Sticks/>
      <div class="slips" aria-live="polite">
        <Slip i={0} lines={[{label: "早餐", text: oneDay.breakfast}]}/>
        <Slip i={1} lines={[{label: "午餐", text: mealText(oneDay.lunch)}]}/>
        <Slip i={2} lines={[{label: "晚餐", text: mealText(oneDay.dinner)}]}/>
      </div>
    </div>
  {/key}
  <div class="again">
    <button class="btn btn-text" type="button" on:click={redraw}>再抽一次</button>
  </div>
</div>
