<script lang="ts">
    import { page } from '$app/state';
    import { resolve } from '$app/paths';
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
    let scrolled = $state(false);

    // Dynamic active state based on route
    const isActive = (href: string) => {
        const currentPath = page.url.pathname;
        const targetPath = resolve(href);
        if (targetPath === '/') return currentPath === '/';
        return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
    };

    afterNavigate(() => (open = false));
</script>

<svelte:window
    onscroll={() => (scrolled = window.scrollY > 8)}
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header
    class={[
        'sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-shadow duration-300',
        scrolled && 'shadow-md'
    ]}
>
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
            href={resolve('/')}
            class="flex items-center transition-opacity hover:opacity-90"
            aria-label="{site.name || 'Bistro'} — Home"
        >
            <enhanced:img
                src={logo}
                alt="{site.name || 'Bistro'} Logo"
                fetchpriority="high"
                class="h-10 w-auto object-contain md:h-12"
            />
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden items-center gap-8 lg:gap-10 md:flex">
            {#each links as { href, label } (href)}
                {@const active = isActive(href)}
                <li>
                    <a
                        href={resolve(href)}
                        aria-current={active ? 'page' : undefined}
                        class={[
                            'py-1 text-lg lg:text-xl font-bold tracking-wide transition-colors duration-150',
                            active
                                ? 'text-accent border-b-2 border-accent'
                                : 'text-ink hover:text-accent border-b-2 border-transparent'
                        ]}
                    >
                        {label}
                    </a>
                </li>
            {/each}
        </ul>

        <!-- Mobile Hamburger Button -->
        <button
            type="button"
            class="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onclick={() => (open = !open)}
        >
            <div class="flex h-5 w-6 flex-col justify-between">
                <span
                    class={[
                        'h-0.5 w-full rounded bg-current transition-all duration-300 ease-in-out',
                        open ? 'translate-y-[9px] rotate-45' : ''
                    ]}
                ></span>
                <span
                    class={[
                        'h-0.5 w-full rounded bg-current transition-all duration-200 ease-in-out',
                        open ? 'scale-x-0 opacity-0' : 'opacity-100'
                    ]}
                ></span>
                <span
                    class={[
                        'h-0.5 w-full rounded bg-current transition-all duration-300 ease-in-out',
                        open ? '-translate-y-[9px] -rotate-45' : ''
                    ]}
                ></span>
            </div>
        </button>
    </nav>

    <!-- Mobile Menu -->
    <div
        id="mobile-menu"
        class={[
            'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        ]}
    >
        <div class="min-h-0 border-t border-ink/5 bg-cream/95">
            <ul class="flex flex-col divide-y divide-ink/5 px-6 py-4 text-center">
                {#each links as { href, label } (href)}
                    {@const active = isActive(href)}
                    <li class="first:pt-0 last:pb-0">
                        <a
                            href={resolve(href)}
                            tabindex={open ? 0 : -1}
                            aria-current={active ? 'page' : undefined}
                            class={[
                                'block py-3.5 text-lg font-bold transition-colors',
                                active
                                    ? 'text-accent underline underline-offset-4 decoration-2'
                                    : 'text-ink hover:text-accent'
                            ]}
                        >
                            {label}
                        </a>
                    </li>
                {/each}

                {#if site.phone}
                    <li class="border-none pt-4">
                        <a
                            href="tel:{site.phone}"
                            tabindex={open ? 0 : -1}
                            class="block w-full rounded-xl bg-accent py-3.5 text-center text-lg font-bold text-cream shadow-sm transition-colors hover:bg-accent/90"
                        >
                            Call {site.phone}
                        </a>
                    </li>
                {/if}
            </ul>
        </div>
    </div>
</header>