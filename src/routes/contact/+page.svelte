<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  let { form, data } = $props();
  let loading = $state(false);
  let widgetContainer: HTMLDivElement | undefined = $state();
  let widgetId: string | undefined;

  const input =
    'mt-1.5 w-full rounded-md border border-current/25 bg-white/40 px-3 py-2.5 text-base transition placeholder:opacity-40 focus:border-current focus:bg-white/70 focus:outline-none';
  const label = 'text-xs font-semibold uppercase tracking-[0.1em] opacity-70';
  const error = 'mt-1 text-sm text-red-800';

  const fmtDate = (d: string) =>
    new Date(d + 'T00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

  function renderWidget() {
    if (!window.turnstile || !widgetContainer || widgetId) return;
    widgetId = window.turnstile.render(widgetContainer, {
      sitekey: '0x4AAAAAAFfWaLJZDPaP5Yyc',
      theme: 'auto'
    });
  }

  function resetWidget() {
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }

  onMount(() => {
    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      const nonce = document
        .querySelector('script[nonce]')
        ?.getAttribute('nonce');
      if (nonce) script.nonce = nonce;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      widgetId = undefined;
    };
  });
</script>

<svelte:head><title>Contact | River Street Market</title></svelte:head>

<div class="mx-auto max-w-2xl px-4 py-16 sm:py-24">
  {#if form?.success}
    <div role="status" class="text-center">
      <div
        class="mx-auto mb-6 grid size-16 place-items-center rounded-full border-2 border-current"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-8"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p class={label}>Inquiry received</p>
      <h1 class="mt-2 text-4xl font-bold sm:text-5xl">
        Thanks{form.values?.name ? `, ${form.values.name.split(' ')[0]}` : ''}!
      </h1>
      <p class="mx-auto mt-4 max-w-md text-lg opacity-80">
        We'll get back to you within two business days to talk menu and
        details.
      </p>

      {#if form.values?.date}
        <dl
          class="mx-auto mt-10 grid max-w-md grid-cols-2 divide-x divide-current/20 rounded-lg border border-current/20 py-5"
        >
          <div>
            <dt class={label}>Date</dt>
            <dd class="mt-1 font-semibold">{fmtDate(form.values.date)}</dd>
          </div>
          <div>
            <dt class={label}>Guests</dt>
            <dd class="mt-1 font-semibold">{form.values.guests}</dd>
          </div>
        </dl>
      {/if}

      <p class="mt-8 text-sm opacity-70">
        Need it sooner? Call
        <a href="tel:5414264315" class="underline underline-offset-4"
          >(541) 426-4315</a
        >.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href="/menu"
          class="rounded-md bg-[#454F35] px-6 py-3 font-semibold text-[#EDE2D0] transition hover:opacity-90"
          >Browse the menu</a
        >
        <a
          href="/"
          class="rounded-md border border-current px-6 py-3 font-semibold transition hover:bg-current/5"
          >Back home</a
        >
      </div>
    </div>
  {:else}
    <header class="mb-10 text-center">
      <p class={label}>Catering</p>
      <h1 class="mt-2 text-4xl font-bold sm:text-5xl">Let's feed your crew</h1>
      <p class="mx-auto mt-4 max-w-md opacity-80">
        Office lunches, weddings, backyard parties. Tell us about your event and
        we'll put together a menu.
      </p>
    </header>

    <form
      method="POST"
      class="space-y-6 rounded-xl border border-current/15 bg-white/25 p-6 sm:p-8"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update({ reset: false });
          loading = false;
          resetWidget();
        };
      }}
    >
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label for="name" class={label}>Name</label>
          <input
            id="name"
            name="name"
            class={input}
            value={form?.values?.name ?? ''}
            autocomplete="name"
            required
          />
          {#if form?.errors?.name}<p class={error}>{form.errors.name}</p>{/if}
        </div>
        <div>
          <label for="phone" class={label}>
            Phone <span class="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            class={input}
            value={form?.values?.phone ?? ''}
            autocomplete="tel"
          />
        </div>
      </div>

      <div>
        <label for="email" class={label}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class={input}
          value={form?.values?.email ?? ''}
          autocomplete="email"
          required
        />
        {#if form?.errors?.email}<p class={error}>{form.errors.email}</p>{/if}
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label for="date" class={label}>Event date</label>
          <input
            id="date"
            name="date"
            type="date"
            min={data.today}
            class={input}
            value={form?.values?.date ?? ''}
            required
          />
          {#if form?.errors?.date}<p class={error}>{form.errors.date}</p>{/if}
        </div>
        <div>
          <label for="guests" class={label}>Guests</label>
          <input
            id="guests"
            name="guests"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="5"
            placeholder="25"
            class={input}
            value={form?.values?.guests ?? ''}
            oninput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
            }}
            required
          />
          {#if form?.errors?.guests}<p class={error}>
              {form.errors.guests}
            </p>{/if}
        </div>
      </div>

      <div>
        <label for="message" class={label}>Details</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          maxlength="2000"
          placeholder="Location, time, dietary needs, vibe..."
          class={input}>{form?.values?.message ?? ''}</textarea
        >
        {#if form?.errors?.message}<p class={error}>
            {form.errors.message}
          </p>{/if}
      </div>

      <div bind:this={widgetContainer}></div>

      <input
        name="website"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
        class="absolute -left-[9999px]"
      />

      {#if form?.errors?.form}
        <p role="alert" class="rounded-md bg-red-900/10 px-4 py-3 text-red-800">
          {form.errors.form}
        </p>
      {/if}

      <button
        disabled={loading}
        class="w-full rounded-md bg-[#454F35] px-6 py-3 font-semibold text-[#EDE2D0] transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send inquiry'}
      </button>
    </form>
  {/if}
</div>