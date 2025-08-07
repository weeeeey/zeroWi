import RecordList from '@/components/features/record/record-list';
import RecordListSkeleton from '@/components/features/record/record-list-skeleton';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { Suspense } from 'react';

async function RecordPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col bg-slate-100 outline-1">
      <Header />

      <div className="h-full flex-1">
        <Suspense fallback={<RecordListSkeleton />}>
          <RecordList />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default RecordPage;
