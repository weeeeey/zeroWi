import { getCurrentUser } from '@/lib/auth/server';
import { getRecords } from '@/lib/record/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import RecordListCard from './record-list-card';

export default async function RecordList() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    redirect('/');
  }
  const recordsWithTotal = await getRecords(currentUser.id);

  return (
    <div className="h-full space-y-4 px-2 py-4">
      {recordsWithTotal.map((record) => (
        <Suspense key={record.id}>
          <RecordListCard record={record} />
        </Suspense>
      ))}
    </div>
  );
}
