<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { site } from '#lib/site.ts';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/menu', label: 'Menu' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/contact', label: 'Contact' }
	];

	let open = $state(false);
	let scrolled = $state(false);

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	afterNavigate(() => (open = false));
</script>

<svelte:window
	onscroll={() => (scrolled = window.scrollY > 8)}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<header
	class={[
		'sticky top-0 z-50 bg-cream/90 backdrop-blur transition-shadow',
		scrolled && 'shadow-md'
	]}
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
		<a href="/" class="font-serif text-xl font-bold tracking-tight md:text-2xl">
			{site.name}
		</a>

		<ul class="hidden items-center gap-8 md:flex">
			{#each links as { href, label }}
				<li>
					<a
						{href}
						aria-current={isActive(href) ? 'page' : undefined}
						class={[
							'relative py-1 transition-colors hover:text-accent',
							'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5',
							'after:origin-left after:bg-accent after:transition-transform',
							isActive(href)
								? 'text-accent after:scale-x-100'
								: 'after:scale-x-0 hover:after:scale-x-100'
						]}
					>
						{label}
					</a>
				</li>
			{/each}
			<li>
				<a
					href="tel:{site.phone}"
					class="rounded-full bg-accent px-4 py-2 text-cream transition hover:brightness-110"
				>
					Call us
				</a>
			</li>
		</ul>

		<button
			class="relative h-10 w-10 md:hidden"
			aria-label={open ? 'Close menu' : 'Open menu'}
			aria-expanded={open}
			aria-controls="mobile-menu"
			onclick={() => (open = !open)}
		>
			<span
				class={[
					'absolute left-2 h-0.5 w-6 bg-ink transition-all duration-300',
					open ? 'top-1/2 rotate-45' : 'top-3'
				]}
			></span>
			<span
				class={[
					'absolute top-1/2 left-2 h-0.5 w-6 bg-ink transition-opacity duration-300',
					open && 'opacity-0'
				]}
			></span>
			<span
				class={[
					'absolute left-2 h-0.5 w-6 bg-ink transition-all duration-300',
					open ? 'top-1/2 -rotate-45' : 'bottom-3'
				]}
			></span>
		</button>
	</nav>

	<div
		id="mobile-menu"
		class={[
			'grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden',
			open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
		]}
	>
		<ul class="min-h-0 border-t border-ink/10 px-4">
			{#each links as { href, label }}
				<li>
					<a
						{href}
						tabindex={open ? 0 : -1}
						aria-current={isActive(href) ? 'page' : undefined}
						class={[
							'block py-3 text-lg',
							isActive(href) ? 'font-semibold text-accent' : 'hover:text-accent'
						]}
					>
						{label}
					</a>
				</li>
			{/each}
			<li class="py-4">
				<a
					href="tel:{site.phone}"
					tabindex={open ? 0 : -1}
					class="block rounded-full bg-accent py-3 text-center text-cream"
				>
					Call {site.phone}
				</a>
			</li>
		</ul>
	</div>
</header>