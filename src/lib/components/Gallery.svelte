<script lang="ts">
  import { onMount } from 'svelte'
  import PhotoSwipeLightbox from 'photoswipe/lightbox'
  import 'photoswipe/style.css'

  const modules = import.meta.glob(
    '#lib/assets/gallery/*.{jpg,jpeg,png,webp}',
    { eager: true, query: { enhanced: true } }
  )

  const images = Object.entries(modules).map(([path, mod]) => ({
    picture: mod.default,
    alt: path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
      .replace(/[-_]/g, ' ')
  }))

  onMount(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    })
    lightbox.init()
    return () => lightbox.destroy()
  })
</script>

<div id="gallery" class="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-1 sm:px-4 py-6 md:grid-cols-2 md:gap-6">
  {#each images as { picture, alt } (picture)}
    <a
      href={picture.img.src}
      data-pswp-width={picture.img.w}
      data-pswp-height={picture.img.h}
      target="_blank"
      class="group relative block overflow-hidden transition-opacity duration-300 hover:opacity-95"
    >
      <enhanced:img
        src={picture}
        {alt}
        sizes="(min-width: 768px) 50vw, 100vw"
        loading="lazy"
      />
    </a>
  {/each}
</div>

<style>
  #gallery :global(picture),
  #gallery :global(img) {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;
  }
  @media (min-width: 768px) {
    #gallery :global(picture),
    #gallery :global(img) {
      height: 520px;
    }
  }
</style>