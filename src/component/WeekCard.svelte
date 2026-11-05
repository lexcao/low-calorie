<script>
  import {OneDay} from "../helper/model";
  import WeekCardItem from "./WeekCardItem.svelte";
  import {weeks} from "../helper/utils";

  export let oneDay = new OneDay()
  const isToday = oneDay.time.getDate() === new Date().getDate()
  const dayOfWeek = weeks[oneDay.time.getDay()]
</script>

<div class="w-full">
  <div class="w-full p-4 rounded-lg bg-white border border-gray-100">
    <div class="mb-3 text-sm {isToday ? 'text-indigo-700 font-bold' : 'text-gray-700'}">{dayOfWeek}</div>
    <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
      <div class="flex items-center gap-2">
        <div class="text-sm text-gray-600">早餐</div>
        <div class="text-lg font-bold">{oneDay.breakfast}</div>
      </div>
      <WeekCardItem label="午餐" meal={oneDay.lunch}/>
      <WeekCardItem label="晚餐" meal={oneDay.dinner}/>
    </div>
  </div>
</div>
