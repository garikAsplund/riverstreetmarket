<script lang="ts">
  import { page } from '$app/state';
  import { afterNavigate } from '$app/navigation';
  import { site } from '#lib/site.ts';
  import NavLogo from '#lib/assets/SVGs/FooterLogo.svelte';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  let open = $state(false);
  let scrollY = $state(0);
  let headerEl = $state<HTMLElement | null>(null);

  const isActive = (href: string) =>
    href === '/'
      ? page.url.pathname === '/'
      : page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

  afterNavigate(() => (open = false));
</script>

<svelte:window
  bind:scrollY
  onkeydown={(e) => e.key === 'Escape' && (open = false)}
  onclick={(e) => {
    if (open && headerEl && !headerEl.contains(e.target as Node)) {
      open = false;
    }
  }}
/>

<header
  bind:this={headerEl}
  class={[
    'sticky top-0 z-50 bg-[#efe0cc] transition-all duration-300'  ]}
>
  <nav
    class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
  >
    <a
      href="/"
      class="flex min-w-0 items-center hover:opacity-90"
      aria-label="{site.name || 'Bistro'} — Home"
    >
      <NavLogo /> 
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

  <div
    id="mobile-menu"
    inert={!open}
    class={[
      'grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden',
      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    ]}
  >
    <div class="min-h-0 overflow-hidden">
      <ul
        class="flex flex-col bg-cream/95 backdrop-blur-xl px-6 text-center"
      >
        {#each links as { href, label }, i (href)}
          <li>
            <a
              {href}
              onclick={() => (open = false)}
              aria-current={isActive(href) ? 'page' : undefined}
              class="block py-3.5 text-lg font-bold text-ink decoration-2 underline-offset-4 hover:text-accent aria-[current=page]:text-accent aria-[current=page]:underline"
            >
              {label}
            </a>
            {#if i < links.length - 1}
              <div class="mx-auto w-2/3 border-b border-ink/5"></div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</header>