<script>
  import DayCard from "../component/DayCard.svelte";
  import {Meal} from "../helper/model";

  let meal

  const luck = () => {
    meal = new Meal()
  }

</script>

<div class="mt-36"></div>
<div class="relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div class="text-center">
                    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span class="block xl:inline mb-4">低 卡</span>
                        <span class="block text-indigo-600 xl:inline">减脂餐</span>
                    </h1>
                    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        随机生成减脂餐，包括烹饪方式、早餐、午餐和晚餐。
                    </p>
                    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div class="rounded-md shadow">
                            <a href="/#/day"
                               class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                一天
                            </a>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-3">
                            <a href="/#/week"
                               class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                                一周
                            </a>
                        </div>
                    </div>
                    <div class="mt-8">
                            <span on:click={luck}
                                  class="cursor-pointer w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 hover:text-gray-500 md:py-4 md:text-lg md:px-10">
                                试试好运
                            </span>
                    </div>
                    {#if meal}
                        <div class="mt-8">
                            <DayCard meal={meal}/>
                        </div>
                    {/if}
                </div>
            </main>
        </div>
    </div>
</div>
