<script lang="ts">
	import { menu } from '#lib/site.ts';
	const fmt = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	});
</script>

<svelte:head><title>Menu</title></svelte:head>

<main
	class="mx-auto max-w-208 px-10 py-8 font-[Verdana,'DejaVu_Sans',sans-serif] "
>
	<header class="mb-12 flex items-center gap-3 md:pl-16">
		<span
			class="w-20 -rotate-8 font-['Brush_Script_MT','Segoe_Script',cursive] text-4xl leading-[0.9]"
		>
			River Street
		</span>
		<span
			class="font-[Impact,'Arial_Narrow_Bold',sans-serif] text-7xl leading-none tracking-wide"
		>
			MARKET
		</span>
	</header>

	<div class="space-y-10">
		{#each Object.entries(menu) as [section, items] (section)}
			<section>
				<h2 class="mb-2 text-3xl font-extrabold uppercase">{section}</h2>
				{#if section.toLowerCase() === 'sandwiches'}
					<p class="mb-6 text-xs text-neutral-600 italic">
						all sandwiches are made on house-made bread called schiacciata -
						you may purchase bread by the half or whole loaf while supplies
						last $4/$8 - gf option available
					</p>
				{/if}
				<ul>
					{#each items as item (item.name)}
						<li class="mb-4">
							<h3 class="text-base font-bold uppercase">
								{item.name}
								{fmt.format(item.price)}
								{#if item.note}
									<small class="ml-1.5 text-xs normal-case">{item.note}</small>
								{/if}
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
		</footer>
	</div>
</main>