<script>
  import TopBar from "../component/TopBar.svelte";
  import Sticks from "../component/Sticks.svelte";
  import Slip from "../component/Slip.svelte";
  import {OneDay} from "../helper/model";
  import {weeks} from "../helper/utils";

  let token = 0
  let days = buildWeek()

  function buildWeek() {
    const today = new OneDay()
    const dayOfWeek = today.time.getUTCDay()
    const list = []
    for (let i = 0; i < 7; i++) {
      const offset = i - dayOfWeek
      const time = new Date()
      time.setDate(today.time.getDate() - offset)
      const oneDay = new OneDay()
      oneDay.time = time
      list.unshift(oneDay)
    }
    return list
  }

  const mealText = (meal) => `${meal.cooking} · ${meal.meat} / ${meal.vegetable} / ${meal.carbohydrate} / ${meal.fruit}`

  const linesFor = (day) => [
    {label: "早餐", text: day.breakfast},
    {label: "午餐", text: mealText(day.lunch)},
    {label: "晚餐", text: mealText(day.dinner)},
  ]

  const redraw = () => {
    days = buildWeek()
    token += 1
  }
</script>

<div class="stage">
  <TopBar title="一周" sideHref="/#/day" sideLabel="抽一天"/>
  {#key token}
    <div class="ritual">
      <Sticks/>
      <div class="slips" aria-live="polite">
        {#each days as day, i}
          <Slip
            i={i}
            day={weeks[day.time.getDay()]}
            today={day.time.getDate() === new Date().getDate()}
            lines={linesFor(day)}
          />
        {/each}
      </div>
    </div>
  {/key}
  <div class="again">
    <button class="btn btn-text" type="button" on:click={redraw}>再抽一次</button>
  </div>
</div>
