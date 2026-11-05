// Builds public/index.html, robots.txt, sitemap.xml, and public/og.png
// from src/branding.mjs plus the ingredient lists in src/helper/data.mjs.
// Run via `npm run generate` (also hooked to prebuild and predev).

import {copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync} from "fs"
import {spawnSync} from "child_process"
import {dirname, join} from "path"
import {fileURLToPath} from "url"
import {Resvg} from "@resvg/resvg-js"
import {branding, documentTitle, versioned} from "../src/branding.mjs"
import {breakfast, carbohydrate, cooking, fruit, meat, vegetable} from "../src/helper/data.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const publicDir = join(root, "public")
const fontFiles = [
  "NotoSansSC-Regular.ttf",
  "NotoSansSC-Bold.ttf",
  "NotoSansSC-Latin-Regular.ttf",
  "NotoSansSC-Latin-Bold.ttf",
].map((name) => join(root, "scripts", "fonts", name))

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}[char]))

const joinList = (items) => items.join("、")

const absoluteUrl = (path) => new URL(path, branding.url).href

const pageTitle = documentTitle(branding)
const ogImageUrl = absoluteUrl(versioned(branding.icons.ogImage))
const hostLabel = new URL(branding.url).host
const ogAlt = `${branding.fullName}。${branding.tagline}`
const wordmarkSrc = versioned(branding.icons.wordmark)

if (!branding.description.startsWith(branding.tagline)) {
  throw new Error("meta description must lead with the tagline")
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: branding.fullName,
  alternateName: [branding.name, branding.romanization],
  url: branding.url,
  description: branding.description,
  inLanguage: branding.locale,
  applicationCategory: "LifestyleApplication",
  isAccessibleForFree: true,
  browserRequirements: "生成菜谱需要 JavaScript。页面说明不需要。",
  image: ogImageUrl,
}

const headerHtml = `
<header class="mast">
  <h1>
    <img class="brand-wordmark mark-light" src="${escapeHtml(wordmarkSrc)}" alt="${escapeHtml(branding.fullName)}" width="520" height="200">
    <img class="brand-wordmark mark-dark" src="${escapeHtml(versioned(branding.icons.wordmarkDark))}" alt="" width="520" height="200">
  </h1>
</header>`.trim()

const appHtml = `
<div id="app" aria-busy="true">
  <div class="stage">
    <p class="tagline">${escapeHtml(branding.tagline)}</p>
    <div class="actions">
      <a class="btn btn-ink" href="/#/day">抽一天</a>
      <a class="btn" href="/#/week">抽一周</a>
    </div>
    <p class="quiet">抽签需要 JavaScript。下面的说明可以直接阅读。</p>
  </div>
</div>`.trim()

const aboutHtml = `
<section id="about" class="essay">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">这个页面做什么</h2>
    <p class="mt-3 leading-7">${escapeHtml(branding.description)}</p>
    <p class="mt-3 leading-7">早餐从早餐清单里抽一项。午餐和晚餐各自包含一种烹饪方式，以及肉类或蛋、蔬菜、主食、水果各一项。清单是项目里现成的数据，页面不会另外编造食材。</p>
    <h2 class="mt-8 text-2xl font-bold text-gray-900">怎么使用</h2>
    <ol class="mt-3 list-decimal pl-5 leading-7 space-y-2">
      <li>选择「抽一天」，查看打开页面这一天的早餐、午餐和晚餐。</li>
      <li>选择「抽一周」，按周日到周六列出七天。</li>
      <li>选择「抽一餐」，只在首页看一餐。</li>
    </ol>
    <p class="mt-3 leading-7">不需要注册。刷新后组合会重新随机。生成菜谱需要 JavaScript，这一节说明不需要。</p>
    <h2 class="mt-8 text-2xl font-bold text-gray-900">常见问题</h2>
    <div class="mt-4 space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">这些结果有热量数字吗？</h3>
        <p class="mt-1 leading-7">没有。页面不计算卡路里、份量或营养素，也不说明吃了会不会瘦。</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">食材清单里现在有什么？</h3>
        <p class="mt-1 leading-7">烹饪方式：${escapeHtml(joinList(cooking))}。早餐：${escapeHtml(joinList(breakfast))}。肉类或蛋：${escapeHtml(joinList(meat))}。蔬菜：${escapeHtml(joinList(vegetable))}。主食：${escapeHtml(joinList(carbohydrate))}。水果：${escapeHtml(joinList(fruit))}。</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">可以把它当成减脂方案吗？</h3>
        <p class="mt-1 leading-7">不能。它只是把现成食材随机排在一起。吃什么、吃多少，需要自己决定。</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">一周是怎么排的？</h3>
        <p class="mt-1 leading-7">以打开页面的日期所在的那一周，从周日排到周六。每一天的菜都是当场随机的，和日期没有固定对应关系。</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">「抽一餐」和「抽一天」有什么区别？</h3>
        <p class="mt-1 leading-7">「抽一餐」只生成一餐，留在首页。「抽一天」会给出早餐、午餐和晚餐。</p>
      </div>
    </div>
    <p class="mt-8 text-sm text-gray-600">站点地址：${escapeHtml(branding.url)}</p>
  </div>
</section>`.trim()

const replacements = {
  "{{LANG}}": escapeHtml(branding.locale),
  "{{TITLE}}": escapeHtml(pageTitle),
  "{{DESCRIPTION}}": escapeHtml(branding.description),
  "{{CANONICAL}}": escapeHtml(branding.url),
  "{{OG_LOCALE}}": escapeHtml(branding.ogLocale),
  "{{FULL_NAME}}": escapeHtml(branding.fullName),
  "{{OG_IMAGE}}": escapeHtml(ogImageUrl),
  "{{OG_ALT}}": escapeHtml(ogAlt),
  "{{FAVICON_ICO}}": escapeHtml(versioned(branding.icons.faviconIco)),
  "{{FAVICON_32}}": escapeHtml(versioned(branding.icons.favicon32)),
  "{{FAVICON_16}}": escapeHtml(versioned(branding.icons.favicon16)),
  "{{APPLE_TOUCH}}": escapeHtml(versioned(branding.icons.appleTouch)),
  "{{JSON_LD}}": JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  "{{HEADER_HTML}}": headerHtml,
  "{{APP_HTML}}": appHtml,
  "{{ABOUT_HTML}}": aboutHtml,
}

let html = readFileSync(join(root, "scripts", "templates", "index.html"), "utf8")
for (const [token, value] of Object.entries(replacements)) {
  if (!html.includes(token)) {
    throw new Error(`index template is missing ${token}`)
  }
  html = html.split(token).join(value)
}
if (html.includes("{{")) {
  throw new Error("index template still has placeholders")
}

const banned = ["千卡", "大卡", "kcal", "用户数", "临床", "科学证明"]
for (const word of banned) {
  if (html.includes(word)) {
    throw new Error(`generated html contains a disallowed claim: ${word}`)
  }
}
for (const item of [...cooking, ...breakfast, ...meat, ...vegetable, ...carbohydrate, ...fruit]) {
  if (!html.includes(item)) {
    throw new Error(`generated html is missing ingredient from data.js: ${item}`)
  }
}
for (const needle of [
  'lang="zh-CN"',
  'rel="canonical"',
  'property="og:image"',
  'property="og:site_name" content="三餐签 · sancan"',
  'name="twitter:card"',
  "application/ld+json",
  "WebApplication",
  branding.fullName,
  branding.title,
  "favicon-32.png?v=1",
  "favicon-16.png?v=1",
  "favicon.ico?v=1",
  "apple-touch-icon.png?v=1",
  "wordmark-light.svg?v=1",
  branding.description,
]) {
  if (!html.includes(needle)) {
    throw new Error(`generated html is missing ${needle}`)
  }
}

writeFileSync(join(publicDir, "index.html"), html)
writeFileSync(join(publicDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`)
writeFileSync(
  join(publicDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeHtml(branding.url)}</loc>\n  </url>\n</urlset>\n`,
)

const brandDir = join(root, "brand")
const publicBrand = join(publicDir, "brand")
mkdirSync(publicBrand, {recursive: true})

const renderSvg = (svg, width) => {
  const resvg = new Resvg(svg, {
    fitTo: {mode: "width", value: width},
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: "Noto Sans SC",
      sansSerifFamily: "Noto Sans SC",
    },
  })
  const rendered = resvg.render()
  if (rendered.width !== width) {
    throw new Error(`expected width ${width}, rendered ${rendered.width}`)
  }
  return rendered.asPng()
}

const pngSize = (png) => ({
  width: png.readUInt32BE(16),
  height: png.readUInt32BE(20),
})

const writePng = (filename, png, width, height) => {
  const size = pngSize(png)
  if (size.width !== width || size.height !== height) {
    throw new Error(`${filename} is ${size.width}x${size.height}, expected ${width}x${height}`)
  }
  writeFileSync(join(publicDir, filename), png)
}

// Light assets only: tailwind darkMode is off, so the page does not swap schemes.
const favicon16 = renderSvg(readFileSync(join(brandDir, "favicon-16-light.svg")), 16)
const favicon32 = renderSvg(readFileSync(join(brandDir, "favicon-32-light.svg")), 32)
const appleTouch = renderSvg(readFileSync(join(brandDir, "favicon-32-light.svg")), 180)
writePng("favicon-16.png", favicon16, 16, 16)
writePng("favicon-32.png", favicon32, 32, 32)
writePng("apple-touch-icon.png", appleTouch, 180, 180)
writeFileSync(join(publicDir, "favicon.ico"), pngsToIco([
  {png: favicon16, size: 16},
  {png: favicon32, size: 32},
]))
rmSync(join(publicDir, "favicon.png"), {force: true})

for (const name of ["wordmark-light.svg", "wordmark-dark.svg"]) {
  copyFileSync(join(brandDir, name), join(publicBrand, name))
}

const wordmarkWidth = 720
const wordmarkHeight = Math.round(wordmarkWidth * (200 / 520))
const wordmarkPng = renderSvg(readFileSync(join(brandDir, "wordmark-light.svg")), wordmarkWidth)
const wordmarkHref = `data:image/png;base64,${wordmarkPng.toString("base64")}`
const taglineSize = [...branding.tagline].length > 24 ? 32 : 36
const ogTokens = {
  "{{WORDMARK_HREF}}": wordmarkHref,
  "{{WORDMARK_X}}": String(Math.round((1200 - wordmarkWidth) / 2)),
  "{{WORDMARK_Y}}": "78",
  "{{WORDMARK_W}}": String(wordmarkWidth),
  "{{WORDMARK_H}}": String(wordmarkHeight),
  "{{TAGLINE_Y}}": String(78 + wordmarkHeight + 72),
  "{{TAGLINE_SIZE}}": String(taglineSize),
  "{{TAGLINE}}": escapeHtml(branding.tagline),
}

let svg = readFileSync(join(root, "scripts", "templates", "og.svg"), "utf8")
for (const [token, value] of Object.entries(ogTokens)) {
  if (!svg.includes(token)) {
    throw new Error(`og template is missing ${token}`)
  }
  svg = svg.split(token).join(value)
}
if (svg.includes("{{")) {
  throw new Error("og template still has placeholders")
}

const og = new Resvg(svg, {
  fitTo: {mode: "width", value: 1200},
  background: "#FAFAF7",
  font: {
    fontFiles,
    loadSystemFonts: false,
    defaultFontFamily: "Noto Sans SC",
    sansSerifFamily: "Noto Sans SC",
  },
})
const rendered = og.render()
if (rendered.width !== 1200 || rendered.height !== 630) {
  throw new Error(`og png rendered at ${rendered.width}x${rendered.height}`)
}
const pixels = rendered.pixels
let ink = 0
for (let i = 0; i < pixels.length; i += 16) {
  if (pixels[i] < 230 || pixels[i + 1] < 230 || pixels[i + 2] < 230) ink += 1
}
if (ink < 400) {
  throw new Error("og png looks blank; check the wordmark and tagline")
}
const ogPng = rendered.asPng()
writeFileSync(join(publicDir, "og.png"), ogPng)

copyFileSync(join(root, "src", "stage.css"), join(publicDir, "stage.css"))
subsetPageFont(`${html}\n${readFileSync(join(root, "src", "stage.css"), "utf8")}`)

console.log(`generated html, robots, sitemap, icons, stage.css, and og.png (${ogPng.length} bytes) for ${hostLabel}`)

function subsetPageFont(text) {
  const probe = spawnSync("python3", ["-m", "fontTools.subset", "--help"], {encoding: "utf8"})
  if (probe.error || probe.status !== 0) {
    console.warn("fontTools is not installed; keeping the committed webfonts")
    return
  }
  const dir = join(publicDir, "fonts")
  mkdirSync(dir, {recursive: true})
  const jobs = [
    ["NotoSansSC-Regular.ttf", "sans-400.woff2"],
    ["NotoSansSC-Bold.ttf", "sans-700.woff2"],
    ["NotoSansSC-Latin-Regular.ttf", "latin-400.woff2"],
    ["NotoSansSC-Latin-Bold.ttf", "latin-700.woff2"],
  ]
  for (const [src, out] of jobs) {
    const result = spawnSync("python3", [
      "-m", "fontTools.subset",
      join(root, "scripts", "fonts", src),
      `--text=${text}`,
      "--flavor=woff2",
      `--output-file=${join(dir, out)}`,
    ], {encoding: "utf8"})
    if (result.status !== 0) {
      throw new Error(`font subset failed for ${src}: ${result.stderr || result.stdout}`)
    }
  }
}

function pngsToIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + (16 * images.length)
  const entries = images.map((image) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 0)
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(image.png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += image.png.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)])
}
