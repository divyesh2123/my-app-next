export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
   
    
    This is the blog layout. You can add a sidebar, navigion, etc. here.
     {children}
    </section>
}