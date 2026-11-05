<script>
  import {Meal} from "../helper/model";

  export let meal = new Meal()
  export let label = ""
</script>

<div class="max-w-4xl w-full">
  <div class="w-full p-4 rounded-lg bg-white border border-gray-100">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center">
        {#if label}
          <div class="mr-4 text-sm text-gray-600">{label}</div>
        {/if}
        <div class="text-xl font-bold">{meal.cooking}</div>
      </div>
      <div class="leading-7 text-gray-800 break-words">
        {meal.meat} / {meal.vegetable} / {meal.carbohydrate} / {meal.fruit}
      </div>
    </div>
  </div>
</div>
