<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	// 1. Import your high-resolution images via Vite asset pipelines
	import dish1 from '#lib/assets/photos/rsm-1.jpg';
	import interior from '#lib/assets/photos/rsm-2.jpg';
	import chef from '#lib/assets/photos/rsm-3.jpg';
	import drink from '#lib/assets/photos/rsm-4.jpg';
	import dish2 from '#lib/assets/photos/rsm-banner.png';

	interface Photo {
		src: string;
		alt: string;
		title: string;
		subtitle: string;
		spanClass: string; // Tailwind grid span configurations
	}

	const photos: Photo[] = [
		{
			src: dish1,
			alt: 'Signature pan-seared scallops',
			title: 'Pan-Seared Scallops',
			subtitle: 'Fresh Catch',
			spanClass: 'md:col-span-2 md:row-span-2 h-[450px]'
		},
		{
			src: interior,
			alt: 'Main dining room ambiance',
			title: 'Our Dining Room',
			subtitle: 'Ambiance',
			spanClass: 'md:col-span-1 md:row-span-1 h-[213px]'
		},
		{
			src: drink,
			alt: 'Crafted botanical cocktail cocktail',
			title: 'Smoked Sage Old Fashioned',
			subtitle: 'Craft Cocktails',
			spanClass: 'md:col-span-1 md:row-span-2 h-[450px]'
		},
		{
			src: chef,
			alt: 'Chef assembling a seasonal dessert plating',
			title: 'Kitchen Craftsmanship',
			subtitle: 'Behind the Scenes',
			spanClass: 'md:col-span-1 md:row-span-1 h-[213px]'
		},
		{
			src: dish2,
			alt: 'House-made rosemary focaccia basket',
			title: 'Artisan Rosemary Focaccia',
			subtitle: 'Baked Fresh Daily',
			spanClass: 'md:col-span-2 md:row-span-1 h-[213px]'
		}
	];

	// Reactive lightbox tracking states using Svelte 5 runes
	let activeIndex = $state<number | null>(null);

	const openLightbox = (index: number) => (activeIndex = index);
	const closeLightbox = () => (activeIndex = null);

	const nextImage = () => {
		if (activeIndex !== null) {
			activeIndex = (activeIndex + 1) % photos.length;
		}
	};

	const prevImage = () => {
		if (activeIndex !== null) {
			activeIndex = (activeIndex - 1 + photos.length) % photos.length;
		}
	};

	// Handle desktop keyboard control mechanisms smoothly
	const handleKeyDown = (e: KeyboardEvent) => {
		if (activeIndex === null) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	};
</script>

<svelte:window onkeydown={handleKeyDown} />

<main class="mx-auto max-w-6xl px-6 py-16">
	<!-- Section Typography Layout Header -->
	<div class="text-center max-w-xl mx-auto mb-16">
		<span class="text-accent text-sm font-semibold tracking-widest uppercase">Visual Story</span>
		<h1 class="text-4xl font-bold tracking-tight text-ink mt-2 sm:text-5xl">The Gallery</h1>
		<p class="text-ink/70 mt-4">A glimpse inside our kitchen, craft cocktails, and the warm atmosphere waiting for you.</p>
	</div>

	<!-- Premium Bento Grid Composition Frame -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 auto-rows-max">
		{#each photos as { src, alt, title, subtitle, spanClass } (alt)}
			<button
				onclick={() => openLightbox(i)}
				class="group relative overflow-hidden rounded-2xl bg-ink/5 text-left border border-ink/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg {spanClass}"
			>
				<!-- SvelteKit Enhanced Asset Transformer -->
				<enhanced:img
					{src}
					{alt}
					class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					loading="lazy"
				/>

				<!-- Tinted Mask Overlay Shade & Descriptive Info Panel -->
				<div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
					<span class="text-accent text-xs font-semibold tracking-wider uppercase mb-1">{subtitle}</span>
					<h3 class="text-white text-xl font-bold">{title}</h3>
				</div>
			</button>
		{/each}
	</div>
</main>

<!-- Immersive Lightbox Modal Container Display Backdrop -->
{#if activeIndex !== null}
	<div
		transition:fade={{ duration: 250 }}
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<!-- Close Layer Clicking Backcloth -->
		<button class="absolute inset-0 cursor-default" aria-label="Close" onclick={closeLightbox}></button>

		<!-- Control Widget Toolsets Bar -->
		<div class="absolute top-4 right-4 z-10 flex items-center gap-4">
			<span class="text-cream/60 font-mono text-sm">{activeIndex + 1} / {photos.length}</span>
			<button
				onclick={closeLightbox}
				class="p-2 rounded-full text-cream/80 hover:text-white hover:bg-white/10 transition-colors"
				aria-label="Close modal dialog"
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>
		</div>

		<!-- Navigational Arrow Controls -->
		<button
			onclick={prevImage}
			class="absolute left-4 z-10 hidden sm:block p-3 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-white/10 transition-colors"
			aria-label="Previous image"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
		</button>

		<button
			onclick={nextImage}
			class="absolute right-4 z-10 hidden sm:block p-3 rounded-full bg-white/5 border border-white/10 text-cream hover:bg-white/10 transition-colors"
			aria-label="Next image"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
		</button>

		<!-- Active Selected Image Render Target Area -->
		{#key activeIndex}
			<div 
				transition:scale={{ start: 0.95, duration: 200 }} 
				class="relative max-w-4xl max-h-[75vh] flex flex-col items-center select-none pointer-events-none"
			>
				<enhanced:img
					src={photos[activeIndex].src}
					alt={photos[activeIndex].alt}
					class="w-full h-full max-h-[70vh] rounded-xl object-contain shadow-2xl"
				/>
				<div class="mt-4 text-center px-4 max-w-xl">
					<h2 class="text-white text-xl font-bold tracking-wide">{photos[activeIndex].title}</h2>
					<p class="text-cream/70 text-sm mt-1">{photos[activeIndex].alt}</p>
				</div>
			</div>
		{/key}
	</div>
{/if}
