<script>
  import {OneDay} from "../helper/model";
  import Center from "../component/Center.svelte";
  import DayCard from "../component/DayCard.svelte";

  export let oneDay = new OneDay()

</script>
<div class="px-4 flex items-center justify-between border-b">
    <a class="opacity-75" href="/#">返回</a>
    <span class="text-4xl px-8 py-3 text-base font-medium text-indigo-700 md:py-4 md:text-lg md:px-10">
        {oneDay.time.toLocaleDateString()}
        </span>
    <a class="text-bold" href="/#/week">一周</a>
</div>

<div class="flex items-center">
    <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div class="w-full lg:w-1/4">
                <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                    <div class="flex items-center justify-between">
                        <div class="text-xs uppercase font-light text-gray-500">
                            早餐
                        </div>
                        <div class="text-xl font-bold">
                            {oneDay.breakfast}
                        </div>
                    </div>
                </div>
            </div>
            <DayCard label="午餐" meal={oneDay.lunch}/>
            <DayCard label="晚餐" meal={oneDay.dinner}/>
        </div>
    </div>
</div>
<Center>
</Center>
