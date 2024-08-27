<script lang="ts">
  let url = 'https://www.data.jma.go.jp/fcd/yoho/data/wxchart/quick/202408/SPAS_COLOR_202408261800.png'
</script>
<div class="h-full grid grid-rows-2">
  <div>
    <div class="grid grid-cols-2 place-items-start">
      <div class="bg-red-200 p-2 text-xl rounded-full">怪獣警報</div>
      <div class="">
        <div>東京都</div>
        <div>神奈川県</div>
      </div>
    </div>
  </div>
  <div>
    <img class="w-64 h-64" src={`https://corsproxy.io/?${url}`} alt="天気図" />
  </div>
</div>