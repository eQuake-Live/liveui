<script lang="ts">
import Footer from './views/Footer.svelte';
import RealTimeSindo from './views/RealTimeSindo/index.svelte'
import MainContent from './views/MainContent/index.svelte'
    import Weather from './views/Weather.svelte';
</script>
<div class="flex flex-col h-dvh">
  <div class="grow flex">
    <div class="grow">
      <MainContent />
    </div>
    <div class="border-l p-1 h-full">
      <Weather />
    </div>
  </div>
  <hr />
  <div>
    <Footer />
  </div>
</div>
