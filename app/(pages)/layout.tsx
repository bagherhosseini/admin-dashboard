import Navbar from '@/components/navbar'

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};