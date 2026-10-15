<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import { site } from '#lib/site.ts'; 
	import logo from '#lib/assets/photos/rsm-banner.png';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/menu', label: 'Menu' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/contact', label: 'Contact' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	// In SvelteKit v3, resolve() takes the route pathname and natively manages your base path setup
	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === resolve('/') : page.url.pathname.startsWith(resolve(href));

	afterNavigate(() => (open = false));
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 8)}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<!-- Header Wrapper -->
<header
	class="sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-all duration-300"
	class:shadow-md={scrolled}
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		
		
	<a 
		href={resolve('/')} 
		class="flex items-center transition-opacity hover:opacity-90"
		aria-label="{site.name || 'Bistro'} — Home"
	>
		<enhanced:img 
			src={logo} 
			alt="{site.name || 'Bistro'} Logo"
			fetchpriority="high"
			class="h-10 w-auto object-contain md:h-12"
		/>
	</a>

		<!-- Desktop Links Menu -->
		<ul class="hidden items-center gap-8 md:flex">
			{#each links as { href, label } (href)}
				<li>
					<a
						href={resolve(href)}
						aria-current={isActive(href) ? 'page' : undefined}
						class="relative py-2 font-medium transition-colors duration-200 hover:text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-200"
						class:text-accent={isActive(href)}
						class:after:scale-x-100={isActive(href)}
						class:after:scale-x-0={!isActive(href)}
						class:hover:after:scale-x-100={!isActive(href)}
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile Hamburger Toggle -->
		<button
			class="relative flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			aria-controls="mobile-menu"
			onclick={() => (open = !open)}
		>
			<span class="relative flex h-5 w-6 flex-col justify-between">
				<span
					class="block h-0.5 w-full origin-left rounded bg-ink transition-all duration-300"
					class:rotate-45={open}
					class:translate-x-1={open}
				></span>
				<span
					class="block h-0.5 w-full rounded bg-ink transition-opacity duration-200"
					class:opacity-0={open}
				></span>
				<span
					class="block h-0.5 w-full origin-left rounded bg-ink transition-all duration-300"
					class:-rotate-45={open}
					class:translate-x-1={open}
				></span>
			</span>
		</button>
	</nav>

	<!-- Mobile Dropdown Accordion Panel -->
	<div
		id="mobile-menu"
		class="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
		class:grid-rows-[1fr]={open}
		class:grid-rows-[0fr]={!open}
	>
		<div class="min-h-0 overflow-hidden bg-cream/95">
			<ul class="flex flex-col px-6 py-4 divide-y divide-ink/5">
				{#each links as { href, label } (href)}
					<li class="first:pt-0 last:pb-0">
						<a
							href={resolve(href)}
							tabindex={open ? 0 : -1}
							aria-current={isActive(href) ? 'page' : undefined}
							class="block py-3.5 font-medium transition-colors"
							class:text-accent={isActive(href)}
							class:font-semibold={isActive(href)}
							class:text-ink={!isActive(href)}
						>
							{label}
						</a>
					</li>
				{/each}
				
				<!-- Mobile CTA Button -->
				<li class="pt-4 border-none">
					<a
						href="tel:{site.phone}"
						tabindex={open ? 0 : -1}
						class="block w-full rounded-xl bg-accent py-3.5 text-center font-semibold text-cream shadow-sm transition-colors hover:bg-accent/90"
					>
						Call {site.phone}
					</a>
				</li>
			</ul>
		</div>
	</div>
</header>
