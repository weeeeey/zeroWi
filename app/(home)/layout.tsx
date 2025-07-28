import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col outline-1">
      <Header />
      <div className="flex-1 bg-slate-100">{children}</div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
