<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { getServerTime } from '../utils/client/time';
  import News from './News.svelte'

  // hh:mm:ss
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  let isDestroyed = false
  let time: Date
  onMount(() => {
    const update = async () => {
      time = await getServerTime()
      if (isDestroyed) {
        return
      }
      setTimeout(update, 100)
    }
    update()
  })
  onDestroy(() => {
    isDestroyed = true
  })

  $: formattedTime = formatter.format(time)
</script>
<div class="flex items-center">
  <News />
  <div class="border-l-2 p-2 m-2 text-4xl font-mono">
    {formattedTime}
  </div>
</div>