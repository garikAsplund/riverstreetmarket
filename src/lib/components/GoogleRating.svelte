<script lang="ts">
  let {
    rating = 5,
    count = 73,
    reviewUrl,
  }: { rating?: number; count?: number; reviewUrl: string } = $props();
</script>

<div class="mt-10 flex justify-center">
  <a
    href={reviewUrl}
    target="_blank"
    rel="noopener"
    aria-label="{rating.toFixed(1)} stars from {count} Google reviews"
    class="group flex flex-col items-center gap-1 font-semibold"
  >
    <span class="text-2xl tracking-[3px]">★★★★★</span>
    <span
      class="text-sm opacity-75 transition duration-300 underline-offset-4 group-hover:underline [@media(hover:hover)]:-translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-75 [@media(hover:hover)]:group-focus-visible:opacity-75"
    >
      {rating.toFixed(1)} · {count} Google reviews
    </span>
  </a>
</div>