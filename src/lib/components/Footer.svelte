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
        <div class="mx-auto max-w-6xl px-4 py-12">
            <a href="/" class="mx-auto mb-10 block w-fit">
                <FooterLogo />
            </a>

            <div class="grid gap-10 text-center md:grid-cols-3">
                <div>
                    <h3
                        class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60"
                    >
                        Location
                    </h3>
                    <a
                        href={site.mapsLink}
                        rel="external"
                        class="opacity-80 hover:text-accent hover:opacity-100"
                    >
                        {a.street}<br />{a.city}, {a.region}
                        {a.zip}
                    </a>
                </div>

                <div class="flex flex-col items-center gap-1 order-last md:order-0">
                    <h3
                        class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60"
                    >
                        Contact
                    </h3>
                    <a href="tel:{site.phone}" class="hover:text-accent md:hidden">
                        {site.phone}
                    </a>
                    <button
                        type="button"
                        onclick={() => copy(site.phone, 'phone')}
                        class="group relative hidden items-center hover:text-accent md:inline-flex"
                        aria-label="Copy phone number"
                    >
                        <span class="">{site.phone}</span>
                        <span
                            class="absolute left-full ml-2 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
                        >
                            {copied === 'phone' ? 'Copied ✓' : 'Copy'}
                        </span>
                    </button>
                    <button
                        type="button"
                        onclick={() => copy(site.email, 'email')}
                        class="group relative inline-flex items-center hover:text-accent"
                        aria-label="Copy email"
                    >
                        <span class="">{site.email}</span>
                        <span
                            class="absolute left-full ml-2 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
                        >
                            {copied === 'email' ? 'Copied ✓' : 'Copy'}
                        </span>
                    </button>
                </div>

                <div>
                    <h3
                        class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60"
                    >
                        Hours
                    </h3>
                    <ul class="mx-auto w-fit space-y-1">
                        {#each page.data.hours ?? [] as h (h)}
                            <li class="flex justify-between gap-8">
                                <span>{h.days}</span>
                                <span class={[!h.close && 'opacity-60']}>
                                    {h.close ? `${h.open}–${h.close}` : h.open}
                                </span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    {/if}
    <Watermark />
</footer>