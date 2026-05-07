export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  console.log('slug', slug);
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
    </div>
  )
}