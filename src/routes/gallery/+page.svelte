<script lang="ts">
	import dish1 from '#lib/assets/photos/rsm-1.jpg?enhanced';
	import interior from '#lib/assets/photos/rsm-2.jpg?enhanced';
	import chef from '#lib/assets/photos/rsm-3.jpg?enhanced';
	import drink from '#lib/assets/photos/rsm-4.jpg?enhanced';
	import dish2 from '#lib/assets/photos/rsm-banner.png?enhanced';

	const photos = [
		{ src: dish1, alt: 'Pan-seared scallops' },
		{ src: interior, alt: 'Our dining room' },
		{ src: drink, alt: 'Smoked sage old fashioned' },
		{ src: chef, alt: 'Chef plating dessert' },
		{ src: dish2, alt: 'Rosemary focaccia' }
	];
</script>

<main class="mx-auto max-w-6xl px-6 py-16">
	<h1 class="mb-12 text-center text-4xl font-bold">Gallery</h1>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each photos as { src, alt } (alt)}
			<enhanced:img
				{src}
				{alt}
				class="aspect-4/3 w-full rounded-2xl object-cover"
			/>
		{/each}
	</div>
</main>