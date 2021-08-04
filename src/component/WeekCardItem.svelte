<script>
  import {Meal} from "../helper/model";

  export let label = ""
  export let meal = new Meal()
</script>

<div class="flex items-center">
    <div class="pr-2 sm:pr-4 text-xs font-light text-gray-500">
        {label}
    </div>
    <div class="pr-2 sm:pr-4 text-xl font-bold">
        {meal.cooking}
    </div>
    <div class="flex flex-col">
        <span>{meal.meat}</span>
        <span>{meal.vegetable}</span>
        <span>{meal.carbohydrate}</span>
        <span>{meal.fruit}</span>
    </div>
</div>
