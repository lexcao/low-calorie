<script>
  import {Meal} from "../helper/model";

  export let meal = new Meal()
  export let label = ""
</script>

<div class="w-full lg:w-1/4">
    <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div class="flex flex-row items-center justify-between">
            <div class="flex flex-col">
                <div class="flex items-center">
                    <div class="mr-4 text-xs uppercase font-light text-gray-500">
                        {label}
                    </div>
                    <div class="text-xl font-bold">
                        {meal.cooking}
                    </div>
                </div>
            </div>
            <div>
                {meal.meat}
                /
                {meal.vegetable}
                /
                {meal.carbohydrate}
                /
                {meal.fruit}
            </div>
        </div>
    </div>
</div>
