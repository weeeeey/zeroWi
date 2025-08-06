import RecordList from '@/components/features/record/record-list';
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
  // if (!recordId) {
  //   redirect('/routines');
  // }

  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col bg-slate-100 outline-1">
      <Header />

      {/* record list 변경 하고 클릭 시 모달 오픈 */}
      {/* recordId가 있다면 list에서 열어주기? */}
      <div className="flex-1">
        <RecordList />
      </div>

      <RecordModifyButton recordId={recordId} />
      <Footer />
    </div>
  );
}

export default RecordPage;
