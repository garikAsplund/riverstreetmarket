<script>
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

<div id="gallery">
  {#each images as { picture, alt }}
    <a
      href={picture.img.src}
      data-pswp-width={picture.img.w}
      data-pswp-height={picture.img.h}
      target="_blank"
    >
      <enhanced:img
        src={picture}
        {alt}
        sizes="(min-width: 768px) 33vw, 100vw"
        loading="lazy"
      />
    </a>
  {/each}
</div>

<style>
  #gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem;
  }
  #gallery :global(img) {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
  }
</style>