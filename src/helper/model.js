import {randomArray} from "./utils";
import {breakfast, carbohydrate, cooking, fruit, meat, vegetable} from "./data";

export class Meal {
  constructor () {
    this.cooking = randomArray(cooking)
    this.meat = randomArray(meat)
    this.vegetable = randomArray(vegetable)
    this.carbohydrate = randomArray(carbohydrate)
    this.fruit = randomArray(fruit)
  }
}

export class OneDay {
  constructor () {
    this.time = new Date()
    this.seed = this.time.getTime()
    this.breakfast = randomArray(breakfast)
    this.lunch = new Meal()
    this.dinner = new Meal()
  }
}
