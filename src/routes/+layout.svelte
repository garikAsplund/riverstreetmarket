<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/rsm-favicon.jpg';
	import type { LayoutProps } from './$types';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { site } from '#lib/site.ts'

	let { children }: LayoutProps = $props();

	const jsonLd = {
			'@context': 'https://schema.org',
			'@type': 'Restaurant',
			name: site.name,
			telephone: site.phone,
			email: site.email,
			address: {
				'@type': 'PostalAddress',
				streetAddress: site.address.street,
				addressLocality: site.address.city,
				addressRegion: site.address.region,
				postalCode: site.address.zip
			}
		};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<Nav />
	<main class="mx-auto w-full max-w-6xl flex-1 px-4">{@render children()}</main>
	<Footer />
</div>