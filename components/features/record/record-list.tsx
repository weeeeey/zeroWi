import { getCurrentUser } from '@/lib/auth/server';
import { getRecords } from '@/lib/record/server';
import { redirect } from 'next/navigation';

import RecordListCard from './record-list-card';

export default async function RecordList() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    redirect('/');
  }
  const recordsWithTotal = await getRecords(currentUser.id);

  return (
    <div className="h-full pb-32">
      {recordsWithTotal.map((record) => (
        <RecordListCard key={record.id} record={record} />
      ))}
    </div>
  );
}
