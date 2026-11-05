<script>
  export let title = ""
  export let sideHref = "/#/week"
  export let sideLabel = "抽一周"
</script>

<nav class="switch" aria-label="页面">
  <a href="/#">返回</a>
  <p>{title}</p>
  <a href={sideHref}>{sideLabel}</a>
</nav>
