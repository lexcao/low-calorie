<script>
  import WeekCard from "../component/WeekCard.svelte";
  import TopBar from "../component/TopBar.svelte";
  import {OneDay} from "../helper/model";

  const today = new OneDay()
  const dayOfWeek = today.time.getUTCDay()
  const weeks = []

  for (let i = 0; i < 7; i++) {
    const offset = i - dayOfWeek
    const time = new Date()
    time.setDate(today.time.getDate() - offset)
    const oneDay = new OneDay()
    oneDay.time = time
    weeks.unshift(oneDay)
  }
</script>

<TopBar title="一周" sideHref="/#/day" sideLabel="一天"/>

<div class="px-4">
  <div class="max-w-4xl w-full mx-auto py-6">
    <div class="flex flex-col w-full space-y-3 mb-2">
      {#each weeks as day}
        <WeekCard oneDay={day}/>
      {/each}
    </div>
  </div>
</div>
