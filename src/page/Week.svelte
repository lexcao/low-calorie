<script>
  import WeekCard from "../component/WeekCard.svelte";
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

<div class="px-4 flex items-center justify-between border-b">
    <a class="opacity-75" href="/#">返回</a>
    <span class="px-8 py-3 text-2xl font-medium text-indigo-700 md:py-4 sm:text-4xl md:px-10">
        一周
        </span>
    <a class="text-bold" href="/#/day">一天</a>
</div>

<div class="flex items-center">
    <div class="max-w-4xl w-full mx-auto py-6 sm:px-6">
        <div class="flex flex-col w-full space-y-2 mb-2">
            {#each weeks as day}
                <WeekCard oneDay={day}/>
            {/each}
        </div>
    </div>
</div>
