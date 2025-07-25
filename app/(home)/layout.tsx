import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}

export default HomeLayout;
