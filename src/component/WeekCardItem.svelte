<script>
  import {Meal} from "../helper/model";

  export let label = ""
  export let meal = new Meal()
</script>

<div class="min-w-0 sm:max-w-xs">
  <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <div class="text-sm text-gray-600">{label}</div>
    <div class="text-lg font-bold">{meal.cooking}</div>
  </div>
  <div class="mt-1 leading-6 text-gray-800 break-words">
    {meal.meat} / {meal.vegetable} / {meal.carbohydrate} / {meal.fruit}
  </div>
</div>
