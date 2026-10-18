<script lang="ts">
    import { site } from '#lib/site.ts';
    import type { PageData } from './$types';
    import GoogleRating from '#lib/components/GoogleRating.svelte';
    import HeroLogo from '#lib/assets/SVGs/HeroLogo.svelte';

    let { data }: { data: PageData } = $props();

    const open = $derived(data.hours?.[0] ?? { days: 'Wed–Sat', open: '11:00', close: '4:00' });
    const short = (t: any) => String(t ?? '').replace(':00', '');
    const tel = site.phone.replace(/\D/g, '');
</script>

<svelte:head><title>River Street Market | Enterprise, OR</title></svelte:head>

<!-- Back to a normal flow layout with comfortable padding -->
<section class="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
    
    <!-- Controlled logo width so it's prominent but not massive -->
    <div class="mx-auto w-full max-w-[340px] sm:max-w-[600px]">
        <HeroLogo />
    </div>

    <a
        href="/menu"
        class="-rotate-8 mt-6 inline-block font-['Brush_Script_MT','Segoe_Script',cursive] text-4xl font-semibold leading-[0.9] underline-offset-4 hover:underline sm:text-5xl"
    >
        See our menu
    </a>
    <p class="mt-8 text-3xl font-extrabold tracking-wide sm:text-4xl">
        {open.days} {short(open.open)}–{short(open.close)}
    </p>
	<a
		href="tel:+1{tel}"
		class="mt-8 inline-block text-2xl font-semibold underline-offset-4 hover:underline sm:text-4xl"
	>
		{site.phone}
	</a>
	<a
		href={site.mapsLink}
		target="_blank"
		rel="noopener noreferrer"
		class="mt-8 block text-lg font-semibold underline underline-offset-4 sm:text-xl"
	>
	{site.address.street}<br />{site.address.city}, {site.address.region}
				</a>
	<GoogleRating reviewUrl="https://search.google.com/local/reviews?placeid=ChIJ-_cFMob5o1QR_V-gfxlzQ9o" />
</section>
