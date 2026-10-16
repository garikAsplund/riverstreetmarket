<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { site } from '#lib/site.ts';
  import logo from '#lib/assets/photos/rsm-banner.png';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' }
  ];

  let open = $state(false);
  let scrollY = $state(0);
  const scrolled = $derived(scrollY > 8);

  const isActive = (href: string) =>
    href === '/'
      ? page.url.pathname === '/'
      : page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

  afterNavigate(() => (open = false));
</script>

<svelte:window
  bind:scrollY
  onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header
  class={[
    'sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-shadow duration-300',
    scrolled && 'shadow-md'
  ]}
>
  <nav
    class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
  >
    <a
      href="/"
      class="flex min-w-0 items-center hover:opacity-90"
      aria-label="{site.name || 'Bistro'} — Home"
    >
      <enhanced:img
        src={logo}
        alt="{site.name || 'Bistro'} Logo"
        fetchpriority="high"
        class="h-10 w-auto max-w-[60vw] object-contain md:h-12"
      />
    </a>

    <ul class="hidden items-center gap-8 md:flex lg:gap-10">
      {#each links as { href, label } (href)}
        <li>
          <a
            {href}
            aria-current={isActive(href) ? 'page' : undefined}
            class="text-lg font-bold tracking-wide text-ink decoration-2 underline-offset-8 transition-colors hover:text-accent hover:underline aria-[current=page]:text-accent aria-[current=page]:underline lg:text-xl"
          >
            {label}
          </a>
        </li>
      {/each}
    </ul>

    <button
      type="button"
      class="-mr-2 shrink-0 p-2 text-ink md:hidden"
      aria-label="Toggle menu"
      aria-expanded={open}
      aria-controls="mobile-menu"
      onclick={() => (open = !open)}
    >
      <svg
        class="h-7 w-7"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'}
        />
      </svg>
    </button>
  </nav>

  {#if open}
    <div
      id="mobile-menu"
      class="border-t border-ink/5 bg-cream/95 md:hidden"
    >
      <ul
        class="flex flex-col divide-y divide-ink/5 px-6 py-4 text-center"
      >
        {#each links as { href, label } (href)}
          <li>
            <a
              {href}
              onclick={() => (open = false)}
              aria-current={isActive(href) ? 'page' : undefined}
              class="block py-3.5 text-lg font-bold text-ink decoration-2 underline-offset-4 hover:text-accent aria-[current=page]:text-accent aria-[current=page]:underline"
            >
              {label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</header>