<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/rsm-favicon.jpg';
	import ogImage from '#lib/assets/photos/rsm-og.jpg';
	import type { LayoutProps } from './$types';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';

	let { children }: LayoutProps = $props();

	const title = $derived(
		page.data.title ? `${page.data.title} | ${site.name}` : site.name
	);
	const description = $derived(page.data.description ?? site.shortBlurb);
	const url = $derived(site.url + page.url.pathname);
	const image = new URL(ogImage, site.url).href;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: site.name,
		description: site.blurb,
		url: site.url,
		image,
		telephone: site.phone,
		email: site.email,
		hasMap: site.mapsLink,
		servesCuisine: ['Deli', 'Sandwiches'],
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.address.street,
			addressLocality: site.address.city,
			addressRegion: site.address.region,
			postalCode: site.address.zip,
			addressCountry: 'US'
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '11:00',
			closes: '16:00'
		}
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={page.data.description ?? site.shortBlurb} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={`${site.name} in ${site.address.city}, ${site.address.region}`} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<Nav />
	<main class="mx-auto w-full max-w-6xl flex-1 px-4">{@render children()}</main>
	<Footer />
</div>