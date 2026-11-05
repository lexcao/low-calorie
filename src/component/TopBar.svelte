<script>
  export let title = ""
  export let sideHref = "/#/week"
  export let sideLabel = "一周"
</script>

<div class="px-1 flex items-center justify-between border-b">
  <a class="inline-flex items-center justify-center px-3 py-3 text-gray-800 hover:text-indigo-700" href="/#">返回</a>
  <p class="px-2 text-sm sm:text-2xl leading-snug font-medium text-indigo-700 text-center">{title}</p>
  <a class="inline-flex items-center justify-center px-3 py-3 text-gray-800 hover:text-indigo-700" href={sideHref}>{sideLabel}</a>
</div>
