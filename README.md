# Low Calorie [低卡]

随机生成每日菜谱，每周菜谱，低卡路里菜谱。 注意：当前是 MVP 版本，最小功能

# Roadmap

* [] 智能提醒，后台推送（功能）
* [] 丰富的界面，H5（设计）
* [] 丰富内容（产品）

# Getting Started

```
$ go build

# without parameter
$ ./low-calorie
~~~ [2021 - 08 - 03 - Tuesday] ~~~~
[BREAKFAST]             鸡蛋
[LUNCH]                 炒 => 虾 + 甘蓝 + 土豆 + 香蕉
[DINNER]                煮 => 牛排 + 花椰菜 + 红薯 + 圣女果

# with paramer [s] or [schedule] for generating one week schedule
$ ./low-calorie -- schedule
~~~ [2021 - 08 - 01 - Sunday] ~~~~
[BREAKFAST]             吐司
[LUNCH]                 煮 => 牛排 + 甘蓝 + 紫薯 + 牛油果
[DINNER]                炒 => 虾 + 胡萝卜 + 麦片 + 西柚
~~~ [2021 - 08 - 02 - Monday] ~~~~
[BREAKFAST]             燕麦
[LUNCH]                 烤 => 虾 + 黄瓜 + 红薯 + 香蕉
[DINNER]                煎 => 鸡胸肉 + 彩椒 + 紫薯 + 香蕉
~~~ [2021 - 08 - 03 - Tuesday] ~~~~
[BREAKFAST]             鸡蛋
[LUNCH]                 炒 => 虾 + 甘蓝 + 土豆 + 香蕉
[DINNER]                煮 => 牛排 + 花椰菜 + 红薯 + 圣女果
~~~ [2021 - 08 - 04 - Wednesday] ~~~~
[BREAKFAST]             玉米
[LUNCH]                 炒 => 鸡蛋 + 胡萝卜 + 土豆 + 西柚
[DINNER]                烤 => 金枪鱼 + 香菇 + 玉米 + 火龙果
~~~ [2021 - 08 - 05 - Thursday] ~~~~
[BREAKFAST]             吐司
[LUNCH]                 煎 => 鸡蛋 + 胡萝卜 + 土豆 + 香蕉
[DINNER]                炒 => 三文鱼 + 花椰菜 + 麦片 + 苹果
~~~ [2021 - 08 - 06 - Friday] ~~~~
[BREAKFAST]             燕麦
[LUNCH]                 煮 => 鸡蛋 + 香菇 + 玉米 + 圣女果
[DINNER]                煎 => 鸡腿肉 + 秋葵 + 土豆 + 苹果
~~~ [2021 - 08 - 07 - Saturday] ~~~~
[BREAKFAST]             鸡蛋
[LUNCH]                 烤 => 鸡胸肉 + 花椰菜 + 土豆 + 火龙果
[DINNER]                煮 => 鸡胸肉 + 胡萝卜 + 红薯 + 火龙果
```

