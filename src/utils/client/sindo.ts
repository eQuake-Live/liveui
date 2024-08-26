import { array, number, object, parse, string, type InferOutput } from 'valibot'

export const sindoResultSchema = object({
  usedTime: string(),
  sindo: array(
    object({
      sindo: number(), // 計測震度
      N: number(), // 北緯
      E: number(), // 東経
    }),
  ),
})
export type SindoResult = InferOutput<typeof sindoResultSchema>

export const getSindo = async (): Promise<
  InferOutput<typeof sindoResultSchema>
> => {
  const json = await fetch(`${import.meta.env.VITE_EQUAKE_API_URL}/sindo`).then(
    (r) => r.json(),
  )

  return parse(sindoResultSchema, json)
}
