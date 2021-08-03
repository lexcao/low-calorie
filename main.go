package main

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

var (
	cooking = []string{"煮", "煎", "炒", "烤"}

	breakfast = []string{"玉米", "鸡蛋", "燕麦", "吐司"}

	// lunch / dinner
	meat         = []string{"鸡胸肉", "鸡腿肉", "牛排", "金枪鱼", "三文鱼", "虾", "鸡蛋"}
	vegetable    = []string{"黄瓜", "彩椒", "胡萝卜", "香菇", "花椰菜", "秋葵", "甘蓝"}
	carbohydrate = []string{"土豆", "红薯", "麦片", "玉米", "紫薯", "意面"}
	fruit        = []string{"圣女果", "香蕉", "苹果", "西柚", "牛油果", "火龙果"}
)

const templateToday = `~~~ [%s] ~~~~
[BREAKFAST]		%s
[LUNCH]			%s
[DINNER]		%s
`

const templateTodayMeal = "%s => %s + %s + %s + %s"

type (
	Meal struct {
		cooking, meat, vegetable, carbohydrate, fruit string
	}

	OneDay struct {
		Time          time.Time
		DateValue     int
		Breakfast     string
		Lunch, Dinner *Meal
	}
)

func main() {
	if len(os.Args) < 3 {
		OneDayMeal()
	} else if os.Args[2] == "s" || os.Args[2] == "schedule" {
		OneWeekSchedule()
	} else if os.Args[2] == "help" {
		fmt.Println("s, OneWeekSchedule 生成一周食谱")
		os.Exit(0)
	} else {
		OneDayMeal()
	}
}

func OneDayMeal() {
	day := NewOneDayNow()
	PrintOneDay(day)
}

func PrintOneDay(day *OneDay) {
	fmt.Printf(
		templateToday,
		day.Time.Format("2006 - 01 - 02 - Monday"),
		day.Breakfast,
		FormatMeal(day.Lunch),
		FormatMeal(day.Dinner),
	)
}

func FormatMeal(meal *Meal) string {
	return fmt.Sprintf(
		templateTodayMeal,
		meal.cooking,
		meal.meat,
		meal.vegetable,
		meal.carbohydrate,
		meal.fruit,
	)
}

func NewOneDayNow() *OneDay {
	return NewOneDay(time.Now())
}

func NewOneDay(day time.Time) *OneDay {
	date := RandSeed(day)

	return &OneDay{
		Time:      day,
		DateValue: date,
		Breakfast: NewBreakFast(int64(date<<1 + 1)),
		Lunch:     NewMeal(int64(date<<1 + 2)),
		Dinner:    NewMeal(int64(date<<1 + 3)),
	}
}

func NewBreakFast(day int64) string {
	rand.Seed(day)
	return random(breakfast)
}

func NewMeal(day int64) *Meal {
	rand.Seed(day)
	return &Meal{
		cooking:      random(cooking),
		meat:         random(meat),
		vegetable:    random(vegetable),
		carbohydrate: random(carbohydrate),
		fruit:        random(fruit),
	}
}

func random(slice []string) string {
	return slice[rand.Intn(len(slice))]
}

func OneWeekSchedule() {
	now := time.Now()
	week := now.Weekday()

	for i := time.Sunday; i <= time.Saturday; i++ {
		offset := int(i - week)
		offsetDate := now.AddDate(0, 0, offset)
		day := NewOneDay(offsetDate)
		PrintOneDay(day)
	}
}

func RandSeed(now time.Time) int {
	value, _ := strconv.Atoi(now.Format("20060102"))
	return value
}
