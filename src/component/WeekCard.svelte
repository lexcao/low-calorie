<script>
  import {OneDay} from "../helper/model";
  import WeekCardItem from "./WeekCardItem.svelte";
  import {weeks} from "../helper/utils";

  export let oneDay = new OneDay()
  const isToday = oneDay.time.getDate() === new Date().getDate()
  const dayOfWeek = weeks[oneDay.time.getDay()]

</script>

<div class="w-full lg:w-1/4">
    <div class="absolute p-2">
        <span class={isToday?"text-indigo-700 font-bold" :""}>{dayOfWeek}</span>
    </div>
    <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <div class="pr-2 sm:pr-4 text-xs uppercase font-light text-gray-500">
                    早餐
                </div>
                <div class="text-xl font-bold">
                    {oneDay.breakfast}
                </div>
            </div>

            <WeekCardItem label="午餐" meal={oneDay.lunch}/>
            <WeekCardItem label="晚餐" meal={oneDay.dinner}/>
        </div>
    </div>
</div>
