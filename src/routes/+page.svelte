<script lang="ts">
	import hero from '#lib/assets/photos/rsm-3.png?enhanced&w=640;1024;1536;1920;2560&quality=75';
	import { site } from '#lib/site.ts';
	import { resolve } from '$app/paths';

	const title = `${site.name} | ${site.address.city} Restaurant`;
	const open = site.hours[0];
	const short = (t: string) => t.replace(':00', '');
	const tel = site.phone.replace(/\D/g, '');
</script>

<section class="mx-auto max-w-3xl px-6 py-8 text-center">
	<enhanced:img
		src={hero}
		alt="{site.name} in {site.address.city}, Oregon"
		sizes="(min-width: 768px) 768px, 100vw"
		fetchpriority="high"
		loading="eager"
		class="mx-auto h-auto max-h-[60svh] w-full rounded-lg object-contain"
	/>
	<a
		href="/menu"
		class="mt-8 inline-block text-3xl font-semibold underline-offset-4 hover:underline sm:text-5xl -rotate-8 font-['Brush_Script_MT','Segoe_Script',cursive] leading-[0.9]"
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
			{site.address.zip}
		</a>
</section>