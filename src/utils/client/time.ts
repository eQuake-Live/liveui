export const getServerTime = async (): Promise<Date> => {
  const json = await fetch(`${import.meta.env.VITE_EQUAKE_API_URL}/time`).then(
    (r) => r.json(),
  )
  return new Date(Date.parse(json.string))
}