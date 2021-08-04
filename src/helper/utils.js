const random = (n) => Math.floor(Math.random() * n)

export const randomArray = (array) => array[random(array.length)]

export const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
