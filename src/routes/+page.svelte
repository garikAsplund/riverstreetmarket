<script lang="ts">
	import { site } from '#lib/site.ts';
	import hero from '#lib/assets/photos/rsm-3.jpg?enhanced';

	const title = `${site.name} | ${site.address.city} Restaurant`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="restaurant" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content="{site.url}/og.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section
	aria-labelledby="hero-title"
	class="relative isolate flex min-h-[calc(100dvh-4rem)] items-end md:items-center"
>
	<enhanced:img
		src={hero}
		alt="Fresh pasta being plated in the {site.name} dining room"
		sizes="100vw"
		fetchpriority="high"
		loading="eager"
		class="absolute inset-0 -z-10 h-full w-full object-cover"
	/>
	<!-- <div
		class="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent md:bg-gradient-to-r"
	></div>

	<div class="mx-auto w-full max-w-6xl px-4 py-12 text-cream md:py-24">
		<h1
			id="hero-title"
			class="font-serif text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-8xl"
		>
			{site.name}
		</h1>
		<p class="mt-3 text-lg opacity-90 md:text-2xl">{site.tagline}</p>

		<section aria-labelledby="hours-title" class="mt-8 max-w-sm">
			<h2
				id="hours-title"
				class="mb-2 text-sm font-semibold tracking-widest uppercase opacity-70"
			>
				Hours
			</h2>
			<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-lg">
				{#each site.hours as h}
					<dt class="font-medium">{h.days}</dt>
					<dd class={[!h.close && 'opacity-60']}>
						{#if h.close}
							<time datetime={h.open}>{h.open}</time>–<time datetime={h.close}
								>{h.close}</time
							>
						{:else}
							{h.open}
						{/if}
					</dd>
				{/each}
			</dl>
		</section>

		<a
			href="/menu"
			class="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
		>
			View the menu <span aria-hidden="true">→</span>
		</a>
	</div> -->
</section>