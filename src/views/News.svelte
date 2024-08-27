<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  // 下に流れてるニュース

  const content = 'この放送は、eQuake Live が提供しています。この文字列はテスト用であり、本来はニュースを放送します。この放送は、eQuake Live が提供しています。この文字列はテスト用であり、本来はニュースを放送します。'

  let divRef: HTMLDivElement

  let isDestroyed = false
  onMount(() => {
    let lastScrollLeft = 0
    const update = async () => {
      divRef.scrollLeft += 1
      if (divRef.scrollLeft === lastScrollLeft) {
        divRef.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
        setTimeout(() => {
          update()
        }, 1000)
        return
      }
      lastScrollLeft = divRef.scrollLeft

      if (isDestroyed) {
        return
      }
      requestAnimationFrame(update)
    }
    update()
  })
  onDestroy(() => {
    isDestroyed = true
  })
</script>
<div bind:this={divRef} class="px-2 no-wrap text-xl w-full overflow-scroll hide-scrollbar whitespace-nowrap">
  {content}
</div>
