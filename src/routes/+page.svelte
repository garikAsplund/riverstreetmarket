<script lang="ts">
	import { site } from '#lib/site.ts';
	import type { PageData } from './$types';
	import GoogleRating from '#lib/components/GoogleRating.svelte';
	import HeroLogo from '#lib/assets/SVGs/HeroLogo.svelte';

	// Explicitly map incoming page properties layout
	let { data }: { data: PageData } = $props();

	// Safely target the first index item, dropping back to static parameters if sheet rows are missing
	const open = $derived(data.hours?.[0] ?? { days: 'Wed–Sat', open: '11:00', close: '4:00' });

	const short = (t: any) => String(t ?? '').replace(':00', '');
	const tel = site.phone.replace(/\D/g, '');
</script>
<!-- <div style="background: #fef08a; color: #000; font-family: monospace; font-size: 11px; padding: 12px; margin: 10px; border-radius: 4px; text-align: left; max-width: 500px; border: 1px solid #eab308; z-index: 9999; position: relative;">
	<strong>Root Page Context Inspector:</strong>
	<pre style="margin: 4px 0 0 0; white-space: pre-wrap;">{JSON.stringify(data, null, 2)}</pre>
</div> -->
<svelte:head><title>River Street Market | Enterprise, OR</title></svelte:head>

<section class="mx-auto max-w-3xl px-6 py-8 text-center">
    <HeroLogo />
	<a
		href="/menu"
		class="mt-8 inline-block text-4xl font-semibold underline-offset-4 hover:underline sm:text-5xl -rotate-8 font-['Brush_Script_MT','Segoe_Script',cursive] leading-[0.9]"
	>
		See our menu
	</a>

	<p class="mt-8 text-3xl font-extrabold sm:text-5xl tracking-wide">
		{open.days} {short(open.open)}–{short(open.close)}
	</p>

	<a
		href="tel:+1{tel}"
		class="mt-8 inline-block text-3xl font-semibold underline-offset-4 hover:underline sm:text-4xl"
	>
		{site.phone}
	</a>
	<a
		href={site.mapsLink}
		target="_blank"
		rel="noopener noreferrer"
		class="mt-8 block text-lg font-semibold underline underline-offset-4 sm:text-xl"
	>
	{site.address.street}, {site.address.city}, {site.address.region}
				{site.address.zip}	</a>
	<GoogleRating reviewUrl="https://search.google.com/local/reviews?placeid=ChIJ-_cFMob5o1QR_V-gfxlzQ9o" />
</section>
