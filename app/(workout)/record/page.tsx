import RecordList from '@/components/features/record/record-list';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

async function RecordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col bg-slate-100 outline-1">
      <Header />

      <div className="h-full flex-1">
        <RecordList />
      </div>

      <Footer />
    </div>
  );
}

export default RecordPage;
