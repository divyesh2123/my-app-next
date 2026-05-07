export default async function ProductDetailsByValue({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

   console.log('userId', userId);
  return (
    <div>
        <h1>Blog Post: {userId}</h1>
    </div>
  )
}