<script lang="ts">
import { onMount } from 'svelte'
import * as d3 from 'd3'
  import { getSindo, type SindoResult } from '../../utils/client';

let svgRef: SVGSVGElement
let map: d3.Selection<SVGSVGElement, unknown, null, undefined>
let projection: d3.GeoProjection

onMount(async () => {
  const geojson = await fetch('/japan.geojson').then((res) => res.json())

  const w = 600
  const h = 600
  const scale = 900

  projection = d3
    .geoMercator()
    .center([136.5, 37.5])
    .scale(scale)
    .translate([w / 2, h / 2])

    const path = d3.geoPath().projection(projection)

  const jpn = geojson
  map = d3.select(svgRef)
  map
    .attr('width', w)
    .attr('height', h)
    .selectAll('path')
    .data(jpn.features)
    .enter()
    .append('path')
    .attr('d', path as unknown as string)
    .attr('class', 'fill-blue-100')
})

let usedTime: Date
let sindo: SindoResult['sindo'] = []
onMount(() => {
  const update = async () => {
    const gotSindo = await getSindo()
    usedTime = new Date(Date.parse(gotSindo.usedTime))
    sindo = gotSindo.sindo

    setTimeout(() => update(), 500)
  }
  update()
})

const points: Map<string, d3.Selection<SVGCircleElement, unknown, null, undefined>> = new Map()

$: {
  if (map && projection) {
    for (const s of sindo) {
      const id = `${s.N},${s.E}`
      if (!points.has(id)) {
        const [x, y] = projection([s.E, s.N]) as [number, number]
        const circle = map
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('fill', 'red')
          .attr('class', 'opacity-50')
        points.set(id, circle)
      }

      const point = points.get(id)
      if (!point) continue
      const normlizedSindo = (s.sindo + 3) / 10 // 0-1

      // min: 2, max: 10
      const r = 2 + (10 - 2) * normlizedSindo
      point.attr('r', r)
        .attr('fill', `hsl(${normlizedSindo * 240 + 120}deg, 100%, 50%)`)
    }
  }
}
</script>
<div>
  <svg bind:this={svgRef} />
  {usedTime}
</div>
