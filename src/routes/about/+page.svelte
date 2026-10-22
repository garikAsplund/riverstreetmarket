<script lang="ts">
  import nickyLindsey from '#lib/assets/photos/nicky-lindsey.jpg?enhanced';
</script>

<svelte:head>
  <title>About | River Street Market</title>
  <meta
    name="description"
    content="River Street Market is a market and deli in Enterprise, Oregon, offering quality, flavorful, and convenient food and wine."
  />
</svelte:head>

<main class="mx-auto max-w-5xl px-6 py-12 sm:py-16">
  <div class="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
    <!-- Left Column: Photo -->
    <div>
      <enhanced:img
        src={nickyLindsey}
        alt="Lindsey and Nicky, owners of River Street Market"
        sizes="(min-width: 768px) 420px, 100vw"
        fetchpriority="high"
        class="h-auto w-full object-cover"
      />
    </div>

    <!-- Right Column: Bio & Styled Quote -->
    <div class="space-y-6">
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Lindsey & Nicky</h1>

      <!-- Main Body Text (bumped up to text-lg) -->
      <div class="space-y-4 text-lg leading-relaxed">
        <p>
          Lindsey brings over 25 years of experience in food service and management. Her husband Nicky, a chef and butcher, runs the kitchen with expertly honed knife work and culinary skill.
        </p>
        <p>
          Together, they make good food approachable and unpretentious—helping neighbors create meaningful meals and sharing the joy food brings to their own lives.
        </p>
      </div>

      <!-- Styled Quote Section (balanced size & spacing) -->
      <blockquote class="border-l-2 border-current/30 pl-4 py-1 space-y-3 italic text-base leading-relaxed opacity-90">
        <p>Food has been my life’s passion for as long as I can remember.</p>
        <p>My journey began at 16, when I started my first restaurant job, balancing massive trays of steaming crawfish and catfish filets.</p>
        <p>— Lindsey Briggs</p>
      </blockquote>
    </div>
  </div>
</main>