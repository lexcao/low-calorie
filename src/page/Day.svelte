<script>
  import {OneDay} from "../helper/model";
  import DayCard from "../component/DayCard.svelte";
  import TopBar from "../component/TopBar.svelte";

  export let oneDay = new OneDay()
  const dateLabel = oneDay.time.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })
</script>

<TopBar title={dateLabel} sideHref="/#/week" sideLabel="一周"/>

<div class="px-4">
  <div class="max-w-4xl w-full mx-auto py-6">
    <div class="flex flex-col w-full space-y-2 mb-2">
      <div class="p-4 rounded-lg bg-white border border-gray-100">
        <div class="flex items-center justify-between gap-3">
          <div class="text-sm text-gray-600">早餐</div>
          <div class="text-xl font-bold">{oneDay.breakfast}</div>
        </div>
      </div>
      <DayCard label="午餐" meal={oneDay.lunch}/>
      <DayCard label="晚餐" meal={oneDay.dinner}/>
    </div>
  </div>
</div>
