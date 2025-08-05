import RecordDetail from '@/components/features/record/record-detail';
import RecordModifyButton from '@/components/features/record/record-modify-button';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { redirect } from 'next/navigation';

interface RecordPageProps {
  searchParams: Promise<{
    recordId: string;
  }>;
}

async function RecordPage({ searchParams }: RecordPageProps) {
  const { recordId } = await searchParams;
  if (!recordId) {
    redirect('/routines');
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col outline-1">
      <Header />

      <div className="flex-1 bg-gradient-to-b from-indigo-600 to-blue-400">
        <RecordDetail recordId={recordId} />
      </div>

      <RecordModifyButton recordId={recordId} />
      <Footer />
    </div>
  );
}

export default RecordPage;
