<script lang="ts">
    import MenuLogo from '#lib/assets/SVGs/MenuLogo.svelte'
    
	let { data } = $props();

	const fmt = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	});
</script>

<svelte:head><title>Menu | River Street Market</title></svelte:head>

<main
	class="mx-auto max-w-208 px-5 py-8 font-[Verdana,'DejaVu_Sans',sans-serif] sm:px-10"
>
	<header class="mb-4 flex items-center gap-2 sm:gap-3 md:pl-16">
	    <MenuLogo />
	</header>

	<div class="space-y-10">
		{#each Object.entries(data.menu) as [section, items] (section)}
			<section>
				<h2 class="mb-2 text-3xl font-extrabold uppercase">{section}</h2>
				{#if section.toLowerCase() === 'sandwiches'}
					<p class="mb-6 text-xs text-neutral-600 italic">
						all sandwiches are made on house-made bread called schiacciata
					</p>
				{/if}
				<ul>
					{#each items as item (item.name)}
						<li class="mb-4">
							<h3 class="text-base font-bold uppercase">
								{item.name}
								{fmt.format(item.price)}
								{#if item.vegetarian}
									<span class="font-semibold lowercase">(v)</span>
								{/if}
								{#each item.notes ?? [] as note (note)}
									<span class="ml-1 text-xs font-bold lowercase">{note}</span>
								{/each}
							</h3>
							{#if item.desc}
								<p class="mt-0.5 text-xs text-neutral-700">{item.desc}</p>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
		<footer class="mt-20 text-xs text-neutral-700 italic">
			<p>aioli contains raw egg yolk</p>
			<p>*contains nuts</p>
			<p>(v) vegetarian</p>
		</footer>
	</div>
</main>
