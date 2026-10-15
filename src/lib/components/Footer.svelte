<script lang="ts">
	import { site } from '#lib/site.ts';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Watermark from '#lib/components/Watermark.svelte'

	const a = site.address;
</script>

<footer class="mt-16 bg-ink text-cream">
    {#if page.url.pathname !== resolve('/')}
    	<div
    		class="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3"
    	>
    		<div>
    			<h2 class="mb-3 font-serif text-2xl font-bold">{site.name}</h2>
    			<a href={site.mapsLink} class="block opacity-80 hover:text-accent hover:opacity-100">
    				{a.street}<br />{a.city}, {a.region}
    				{a.zip}
    			</a>
    		</div>
    
    		<div>
    			<h3 class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60">Hours</h3>
    			<ul class="space-y-1">
    				{#each site.hours as h}
    					<li class="flex justify-center gap-4 sm:justify-between">
    						<span>{h.days}</span>
    						<span class={[!h.close && 'opacity-60']}>
    							{h.close ? `${h.open}–${h.close}` : h.open}
    						</span>
    					</li>
    				{/each}
    			</ul>
    		</div>
    
    		<div class="sm:col-span-2 lg:col-span-1">
    			<h3 class="mb-3 text-sm font-semibold tracking-widest uppercase opacity-60">Contact</h3>
    			<a href="tel:{site.phone}" class="block hover:text-accent">{site.phone}</a>
    			<a href="mailto:{site.email}" class="block hover:text-accent">{site.email}</a>
    		</div>
    	</div>
     {/if}
    <Watermark />
</footer>