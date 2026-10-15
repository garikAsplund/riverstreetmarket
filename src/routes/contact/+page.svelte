<script lang="ts">
  import { enhance } from '$app/forms';

  let { form, data } = $props();
  let loading = $state(false);

  const input =
    'mt-1 w-full rounded border border-current/30 bg-transparent px-3 py-2 text-base';
</script>

<div class="mx-auto max-w-xl px-4 py-12">
  {#if form?.success}
    <p role="status">Thanks! We got your inquiry and will be in touch soon.</p>
  {:else}
    <h1 class="mb-6 text-2xl font-bold">Catering inquiry</h1>

    <form
      method="POST"
      class="space-y-4"
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update({ reset: false });
          loading = false;
        };
      }}
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="name">Name</label>
          <input
            id="name"
            name="name"
            class={input}
            value={form?.values?.name ?? ''}
            autocomplete="name"
            required
          />
          {#if form?.errors?.name}<p class="text-sm">{form.errors.name}</p>{/if}
        </div>

        <div>
          <label for="phone">Phone</label>
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
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          class={input}
          value={form?.values?.email ?? ''}
          autocomplete="email"
          required
        />
        {#if form?.errors?.email}<p class="text-sm">{form.errors.email}</p>{/if}
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="date">Event date</label>
          <input
            id="date"
            name="date"
            type="date"
            min={data.today}
            class={input}
            value={form?.values?.date ?? ''}
            required
          />
          {#if form?.errors?.date}<p class="text-sm">{form.errors.date}</p>{/if}
        </div>

        <div>
          <label for="guests">Guests</label>
          <input
            id="guests"
            name="guests"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="5"
            class={input}
            value={form?.values?.guests ?? ''}
            oninput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
            }}
            required
          />
          {#if form?.errors?.guests}<p class="text-sm">
              {form.errors.guests}
            </p>{/if}
        </div>
      </div>

      <div>
        <label for="message">Details</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          maxlength="2000"
          class={input}>{form?.values?.message ?? ''}</textarea
        >
        {#if form?.errors?.message}<p class="text-sm">
            {form.errors.message}
          </p>{/if}
      </div>

      <input
        name="website"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
        class="absolute -left-[9999px]"
      />

      {#if form?.errors?.form}<p role="alert">{form.errors.form}</p>{/if}

      <button
        disabled={loading}
        class="w-full rounded border border-current px-4 py-2 font-semibold disabled:opacity-50 sm:w-auto"
      >
        {loading ? 'Sending...' : 'Send inquiry'}
      </button>
    </form>
  {/if}
</div>