<script>
  import DayCard from "../component/DayCard.svelte";
  import {Meal} from "../helper/model";
  import {branding} from "../branding.mjs";

  let meal

  const luck = () => {
    meal = new Meal()
  }
</script>

<div class="px-4 pt-4 pb-4">
  <div class="max-w-7xl mx-auto">
    <main class="w-full">
      <div class="text-center">
        <p class="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl">
          {branding.tagline}
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
          <div class="rounded-md shadow">
            <a href="/#/day"
               class="w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              一天
            </a>
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <a href="/#/week"
               class="w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
              一周
            </a>
          </div>
        </div>
        <div class="mt-8">
          <button type="button" on:click={luck}
                  class="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
            试试好运
          </button>
        </div>
        <div class="mt-8" aria-live="polite">
          {#if meal}
            <div class="flex items-center justify-center">
              <DayCard meal={meal}/>
            </div>
          {:else}
            <p class="text-gray-600">还没有菜谱。点「试试好运」随机生成一餐。</p>
          {/if}
        </div>
      </div>
    </main>
  </div>
</div>
