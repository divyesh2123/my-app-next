export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    filters?: string | string[]
  }>
}) {
  const { filters } = await searchParams

  // If query is like ?filters=a
  // filters === "a"

  // If query is like ?filters=a&filters=b
  // filters === ["a", "b"]

  return <div>{JSON.stringify(filters)}</div>
}