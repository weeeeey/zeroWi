interface PageProps {
  params: Promise<{
    recordId: string;
  }>;
}

async function RecordModifyPage({ params }: PageProps) {
  const { recordId } = await params;
  return <div>RecordModifyPage {recordId}</div>;
}

export default RecordModifyPage;
