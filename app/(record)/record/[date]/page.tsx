interface RecordDatePage {
  params: Promise<{
    routineId: string;
  }>;
}

async function RecordDatePage({ params }: RecordDatePage) {
  const { routineId } = await params;
  return <div>RecordDatePage</div>;
}

export default RecordDatePage;
