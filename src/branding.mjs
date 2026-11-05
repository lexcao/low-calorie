// Product name, tagline, description, and icon paths live in this file.
// Edit this module, then run `npm run generate`.

export const branding = {
  name: "三餐签",
  romanization: "sancan",
  fullName: "三餐签 · sancan",
  tagline: "不用记卡路里，替你搭好今天的低卡三餐。",
  title: "三餐签 · 低卡减脂三餐/一周食谱随机搭配",
  description:
    "不用记卡路里，替你搭好今天的低卡三餐。从固定食材清单里随机组合早餐、午餐和晚餐，也可以一次排出一周。页面不计算热量，也不提供营养或医疗建议。",
  locale: "zh-CN",
  ogLocale: "zh_CN",
  url: "https://cal.lexcao.io/",
  iconVersion: "1",
  icons: {
    favicon16: "/favicon-16.png",
    favicon32: "/favicon-32.png",
    faviconIco: "/favicon.ico",
    appleTouch: "/apple-touch-icon.png",
    wordmark: "/brand/wordmark-light.svg",
    wordmarkDark: "/brand/wordmark-dark.svg",
    ogImage: "/og.png",
  },
}

export function documentTitle(brand = branding) {
  return brand.title
}

export function versioned(path, brand = branding) {
  const joiner = path.includes("?") ? "&" : "?"
  return `${path}${joiner}v=${brand.iconVersion}`
}
