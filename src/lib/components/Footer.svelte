<script lang="ts">
    import { site } from '#lib/site.ts';
    import { page } from '$app/state';
    import Watermark from '#lib/components/Watermark.svelte';
    import FooterLogo from '#lib/assets/SVGs/FooterLogo.svelte'

    const a = site.address;
    let copied = $state<'email' | 'phone' | null>(null);

    async function copy(value: string, key: 'email' | 'phone') {
        await navigator.clipboard.writeText(value);
        copied = key;
        setTimeout(() => (copied = null), 1500);
    }
</script>

<footer class="mt-16 bg-ink text-cream">
    {#if page.route.id !== '/'}
        <!-- Changed to lg:grid-cols-4 to accommodate the separate logo item -->
        <div
            class="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4"
        >
            <!-- 1. Logo Grid Item -->
            <div class="flex items-center justify-center sm:justify-start">
                <a href="/">
                    <FooterLogo />
                </a>
            </div>

            <!-- 2. Address Grid Item -->
            <div>
                <h3 class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60">
                    Location
                </h3>
                <a
                    href={site.mapsLink}
                    rel="external"
                    class="block opacity-80 hover:text-accent hover:opacity-100"
                >
                    {a.street}<br />{a.city}, {a.region}
                    {a.zip}
                </a>
            </div>

            <!-- 3. Hours Grid Item -->
            <div>
                <h3 class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60">
                    Hours
                </h3>
                <ul class="space-y-1 md:w-50">
                    {#each page.data.hours ?? [] as h (h)}
                        <li class="flex justify-center gap-4 sm:justify-between">
                            <span>{h.days}</span>
                            <span class={[!h.close && 'opacity-60']}>
                                {h.close ? `${h.open}–${h.close}` : h.open}
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- 4. Contact Grid Item -->
            <div class="space-y-1 sm:col-span-2 lg:col-span-1">
                <h3 class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60">
                    Contact
                </h3>
                <a href="tel:{site.phone}" class="block hover:text-accent md:hidden">
                    {site.phone}
                </a>
                <button
                    type="button"
                    onclick={() => copy(site.phone, 'phone')}
                    class="group relative mx-auto hidden w-fit items-center hover:text-accent sm:mx-0 md:flex"
                    aria-label="Copy phone number"
                >
                    <span class="select-all">{site.phone}</span>
                    <span
                        class="absolute left-full ml-2 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
                    >
                        {copied === 'phone' ? 'Copied ✓' : 'Copy'}
                    </span>
                </button>
                <button
                    type="button"
                    onclick={() => copy(site.email, 'email')}
                    class="group relative mx-auto flex w-fit items-center hover:text-accent sm:mx-0"
                    aria-label="Copy email"
                >
                    <span class="select-all">{site.email}</span>
                    <span
                        class="absolute left-full ml-2 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
                    >
                        {copied === 'email' ? 'Copied ✓' : 'Copy'}
                    </span>
                </button>
            </div>
        </div>
    {/if}
    <Watermark />
</footer>